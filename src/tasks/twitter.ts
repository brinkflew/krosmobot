import { TextChannel, MessageEmbed } from 'discord.js';
import { safeHtml } from 'common-tags';
import { Task } from '@/structures';
import { PICTURES } from '@/constants';
import { GuildDocument } from 'types';

/**
 * Check the state of the Twitter stream and ensure it stays alive.
 */
export default class TwitterTask extends Task {

  public interval!: number;
  private color = '#1DA1F2';
  private query = 'from:krosmobot OR from:DOFUSfr OR from:AnkamaGames -is:retweet -is:quote';
  private lastTweetID?: string;

  public constructor() {
    super('twitter', { interval: 5 });
  }

  /**
   * Runs the task.
   */
  public async exec() {
    const { twitter } = this.client;
    const result: { [key: string]: string } = {};

    /* eslint-disable @typescript-eslint/naming-convention */
    const params: { [key: string]: string } = {
      'query': this.query,
      'tweet.fields': 'text,author_id,attachments,entities,created_at,in_reply_to_user_id',
      'user.fields': 'profile_image_url,name,username,verified',
      'media.fields': 'url',
      'expansions': 'author_id,attachments.media_keys'
    };

    if (this.lastTweetID) {
      params.since_id = this.lastTweetID;
      result.since = `${this.lastTweetID} (tweet id)`;
    } else {
      params.start_time = new Date(Date.now() - (Math.max(this.interval, 10000) * 1.5)).toISOString();
      result.since = `${params.start_time} (timestamp)`;
    }
    /* eslint-disable @typescript-eslint/naming-convention */

    try {
      const tweets = await twitter.get('tweets/search/recent', params);
      if (!tweets.meta.result_count) return;
      result.fetched = `${(<number> tweets.meta.result_count)} tweets`;
      this.lastTweetID = tweets.meta.newest_id;

      for (const guild of this.client.guilds.cache.array()) {
        const doc = <GuildDocument> this.client.providers.guilds.get(guild.id);
        if (!doc?.channels?.news) continue;

        const channel = this.client.util.resolveChannel(doc.channels.news, guild.channels.cache);
        if (!(channel instanceof TextChannel)) continue;

        /* eslint-disable @typescript-eslint/restrict-template-expressions */
        for (const tweet of tweets.data) {
          if (tweet.in_reply_to_user_id) continue;
          const author = (<any[]> tweets.includes.users).find(user => user.id === tweet.author_id);
          const authorURL = `https://www.twitter.com/${author.username}`;

          let description = safeHtml(tweet.text);

          if (tweet.entities?.urls) {
            for (const entity of tweet.entities.urls) {
              if (!entity.expanded_url || !entity.url) continue;

              let substitute = '';
              if (!/\/photo\/[0-9]+$/.test(<string>entity.expanded_url)) substitute = `[${entity.display_url}](${entity.expanded_url})`;
              description = description.replace(entity.url, substitute);
            }
          }

          const embed = new MessageEmbed({
            color: this.color,
            author: {
              name: `\@${author.username}`,
              url: authorURL,
              iconURL: author.profile_image_url
            },
            description,
            fields: [{ name: '\u200B', value: `[${this.t('TASK_TWITTER_ORIGINAL_TWEET', guild)}](${authorURL}/status/${tweet.id})` }],
            timestamp: Date.parse(tweet.created_at),
            footer: {
              iconURL: PICTURES.TWITTER.ICON,
              text: this.t('TASK_TWITTER_FOOTER', guild)
            }
          });

          if (tweet.attachments?.media_keys?.length) {
            const media = (<any[]>tweets.includes.media)
              .find(media => (<string[]>tweet.attachments.media_keys).includes(media.media_key) && media.type === 'photo');
            if (media) embed.setImage(media.url);
          }

          void channel.send(embed);
        }
        /* eslint-enable @typescript-eslint/restrict-template-expressions */
      }

      return result;
    } catch (error) {
      if (typeof error === 'string') error = new Error(error);
      else if ('errors' in error) error = new Error(error.errors[0].message || 'Twitter Error');
      else if ('status' in error) error = new Error(`Twitter Error: ${(<number> error.status)} - ${(<string> error.title)}`);
      throw error;
    }
  }

}
