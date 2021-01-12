import { Listener } from 'discord-akairo';
import { TextChannel, MessageEmbed } from 'discord.js';
import { XmlEntities } from 'html-entities';
import { TWITTER_USERS } from '@/constants';
import { twitter as icons } from '@/constants/pictures';

/**
 * Does something when the client emits a debugging event.
 */
export default class extends Listener {

  private entities = new XmlEntities();

  public constructor() {
    super('twitter-data', {
      emitter: 'twitter',
      event: 'data'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(tweet: any) {
    this.client.logger.debug(`New tweet from ${(<string>tweet.user.screen_name)}`);

    if (!TWITTER_USERS.includes(tweet.user.id_str)) return;
    if (tweet.in_reply_to_status_id_str || tweet.in_reply_to_user_id_str) return;
    if (tweet.is_quote_status) return;
    if (tweet.retweeted_status) return;

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
        description: this.entities.decode(tweet.extended_tweet?.full_text || tweet.text),
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
