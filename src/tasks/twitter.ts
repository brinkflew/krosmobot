import { TextChannel, MessageEmbed } from 'discord.js';
import Twitter from 'twit';
import { XmlEntities } from 'html-entities';
import { Task } from '@/structures';
import { twitter as icons } from '@/constants/pictures';

const entities = new XmlEntities();

/**
 * Checks for news on the www.dofus.com's RSS feed and sends them to guilds.
 */
export default class TwitterTask extends Task {

  public twitter: Twitter;
  public lastCheck: string;

  public constructor() {
    super('twitter', { timestamp: Date.now() });

    /* eslint-disable @typescript-eslint/naming-convention */

    const {
      KROSMOBOT_TWITTER_CONSUMER_KEY,
      KROSMOBOT_TWITTER_CONSUMER_SECRET,
      KROSMOBOT_TWITTER_ACCESS_TOKEN,
      KROSMOBOT_TWITTER_ACCESS_TOKEN_SECRET
    } = process.env;

    if (!KROSMOBOT_TWITTER_CONSUMER_KEY || !KROSMOBOT_TWITTER_CONSUMER_SECRET) {
      throw new Error('No Twitter consumer key/secret provided');
    }

    if (!KROSMOBOT_TWITTER_ACCESS_TOKEN || !KROSMOBOT_TWITTER_ACCESS_TOKEN_SECRET) {
      throw new Error('No Twitter access token/secret provided');
    }

    this.twitter = new Twitter({
      consumer_key: KROSMOBOT_TWITTER_CONSUMER_KEY,
      consumer_secret: KROSMOBOT_TWITTER_CONSUMER_SECRET,
      access_token: KROSMOBOT_TWITTER_ACCESS_TOKEN,
      access_token_secret: KROSMOBOT_TWITTER_ACCESS_TOKEN_SECRET,
      timeout_ms: 60 * 1000
    });

    /* eslint-enable @typescript-eslint/naming-convention */

    this.lastCheck = new Date().toUTCString();
  }

  /**
   * Runs the task.
   */
  public exec() {
    this.lastCheck = new Date().toUTCString();

    /* eslint-disable @typescript-eslint/naming-convention */

    const stream = this.twitter.stream('statuses/filter', {
      track: 'from:DOFUSfr OR from:AnkamaGames OR from:AnkamaLive',
      mode: 'public',
      tweet_mode: 'extended',
      result_type: 'recent',
      include_entities: true
    });

    stream.on('error', error => {
      throw error;
    });

    /* eslint-enable @typescript-eslint/naming-convention */

    stream.on('tweet', tweet => {
      for (const guild of this.client.guilds.cache.array()) {
        const config = this.client.settings.guilds.get(guild.id, 'dofus', {});
        if (!config.rss?.news) continue;

        const channel = this.client.util.resolveChannel(config.rss.news, guild.channels.cache);
        if (!(channel instanceof TextChannel)) continue;

        const common = { color: '#1DA1F2' };

        /* eslint-disable @typescript-eslint/restrict-template-expressions */
        const userUrl = `https://www.twitter.com/${tweet.user.screen_name}`;
        const embed = new MessageEmbed({
          ...common,
          title: 'Tweet',
          url: `${userUrl}/status/${tweet.id_str}`,
          author: {
            name: `\@${tweet.user.screen_name}`,
            url: userUrl,
            iconURL: tweet.user.profile_image_url_https
          },
          description: entities.decode(tweet.extended_tweet?.full_text || tweet.text),
          footer: {
            iconURL: icons.twitter,
            text: 'Twitter'
          }
        });

        if (tweet.extended_entities?.media?.length && tweet.extended_entities?.media[0].type === 'photo') {
          embed.setImage(tweet.extended_entities.media[0].media_url_https);
        }

        void channel.send(embed);
      }
    });
  }

}
