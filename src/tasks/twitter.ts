import { TextChannel, MessageEmbed } from 'discord.js';
import Twitter from 'twit';
import { XmlEntities } from 'html-entities';
import { Task } from '@/structures';
// import { TwitterResponse } from 'types';
import { twitter as icons } from '@/constants/pictures';

const entities = new XmlEntities();

/**
 * Checks for news on the www.dofus.com's RSS feed and sends them to guilds.
 */
export default class TwitterTask extends Task {

  public twitter: Twitter;
  public lastCheck: string;

  public constructor() {
    super('news', { interval: 10 });

    /* eslint-disable @typescript-eslint/naming-convention */

    const {
      KROSMOBOT_TWITTER_CONSUMER_KEY,
      KROSMOBOT_TWITTER_CONSUMER_SECRET,
      KROSMOBOT_TWITTER_ACCESS_TOKEN,
      KROSMOBOT_TWITTER_ACCESS_TOKEN_SECRET
    } = process.env;

    if (!KROSMOBOT_TWITTER_CONSUMER_KEY || !KROSMOBOT_TWITTER_CONSUMER_SECRET) {
      throw new Error('Invalid Twitter Consumer key/secret');
    }

    if (!KROSMOBOT_TWITTER_ACCESS_TOKEN || !KROSMOBOT_TWITTER_ACCESS_TOKEN_SECRET) {
      throw new Error('Invalid Twitter Access token/secret');
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
  public async exec() {
    /* eslint-disable @typescript-eslint/naming-convention */
    const tweets = this.twitter.get('search/tweets', {
      q: `from:DOFUSfr OR from:AnkamaGames since:${this.lastCheck}`,
      lang: 'fr',
      result_type: 'recent',
      tweet_mode: 'extended',
      include_entities: true
    });
    /* eslint-enable @typescript-eslint/naming-convention */

    this.lastCheck = new Date().toUTCString();

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { data } = <any>(await tweets);
    if (!data.statuses.length) return;

    for (const guild of this.client.guilds.cache.array()) {
      const config = this.client.settings.guilds.get(guild.id, 'dofus', {});
      if (!config.rss?.news) continue;

      const channel = this.client.util.resolveChannel(config.rss.news, guild.channels.cache);
      if (!(channel instanceof TextChannel)) continue;

      const common = { color: '#1DA1F2' };

      /* eslint-disable @typescript-eslint/restrict-template-expressions */
      for (const tweet of data.statuses) {
        const embed = new MessageEmbed({
          ...common,
          title: 'Tweet',
          url: `https://www.twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`,
          author: {
            name: `\@${tweet.user.screen_name}`,
            url: tweet.user.url,
            iconURL: tweet.user.profile_image_url_https
          },
          description: entities.decode(tweet.full_text),
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
    }
  }

}
