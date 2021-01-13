import { TextChannel, MessageEmbed } from 'discord.js';
import { XmlEntities } from 'html-entities';
import { Task } from '@/structures';
import { twitter as icons } from '@/constants/pictures';

/**
 * Check the state of the Twitter stream and ensure it stays alive.
 */
export default class AlmanaxTask extends Task {

  private color = '#1DA1F2';
  private query = 'from:krosmobot';
  private lastTweetID?: string;
  private entities: XmlEntities;

  public constructor() {
    super('twitter', { interval: 5 });
    this.entities = new XmlEntities();
  }

  /**
   * Runs the task.
   */
  public async exec() {
    const { twitter, logger } = this.client;

    /* eslint-disable @typescript-eslint/naming-convention */
    const params: { [key: string]: string } = {
      'query': this.query,
      'tweet.fields': 'text,author_id,attachments,entities',
      'user.fields': 'profile_image_url,name,username,verified',
      'media.fields': 'url',
      'expansions': 'author_id,attachments.media_keys'
    };

    if (this.lastTweetID) {
      params.since_id = this.lastTweetID;
    } else {
      params.start_time = new Date(Date.now() - (Math.max(this.interval || 0, 10000))).toISOString();
    }
    /* eslint-disable @typescript-eslint/naming-convention */

    try {
      const tweets = await twitter.get('tweets/search/recent', params);
      if (!tweets.meta.result_count) return;

      this.lastTweetID = tweets.meta.newest_id;

      for (const guild of this.client.guilds.cache.array()) {
        const config = this.client.providers.guilds.get(guild.id, 'dofus', {});
        if (!config.rss?.news) continue;

        const channel = this.client.util.resolveChannel(config.rss.news, guild.channels.cache);
        if (!(channel instanceof TextChannel)) continue;

        /* eslint-disable @typescript-eslint/restrict-template-expressions */
        for (const tweet of tweets.data) {
          const author = (<any[]> tweets.includes.users).find(user => user.id === tweet.author_id);
          const authorURL = `https://www.twitter.com/${author.username}`;

          let description = this.entities.decode(tweet.text);

          for (const entity of tweet.entities.urls) {
            if (!entity.expanded_url || !entity.url) continue;

            let substitute = '';
            if (!/\/photo\/[0-9]+$/.test(<string>entity.expanded_url)) substitute = `[${entity.display_url}](${entity.expanded_url})`;
            description = description.replace(entity.url, substitute);
          }

          const embed = new MessageEmbed({
            color: this.color,
            title: 'Tweet',
            url: `${authorURL}/status/${tweet.id}`,
            author: {
              name: `\@${author.name}`,
              url: authorURL,
              iconURL: author.profile_image_url
            },
            description,
            footer: {
              iconURL: icons.twitter,
              text: 'Twitter'
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
    } catch (error) {
      if ('errors' in error) error = new Error(error.errors[0].message || 'Twitter Error');
      logger.error(error);
    }
  }

}
