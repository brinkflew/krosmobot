import { TextChannel, MessageEmbed } from 'discord.js';
import Parser, { Output } from 'rss-parser';
import { Task } from '@/structures';
import { rss as icons } from '@/constants/pictures';

/**
 * Checks for news on the www.dofus.com's RSS feed and sends them to guilds.
 */
export default class RSSTask extends Task {

  public parser: Parser;
  public lastPublication: number;
  public categories = ['news', 'devblog', 'changelog'];

  public constructor() {
    super('rss', { interval: 10 });

    this.parser = new Parser();
    this.lastPublication = Date.now();
  }

  /**
   * Runs the task.
   */
  public async exec() {
    const feeds: Output[] = await Promise.all([
      this.parser.parseURL('https://www.dofus.com/fr/rss/news.xml'),
      this.parser.parseURL('https://www.dofus.com/fr/rss/devblog.xml'),
      this.parser.parseURL('https://www.dofus.com/fr/rss/changelog.xml')
    ]);

    for (const guild of this.client.guilds.cache.array()) {
      for (const [id, feed] of feeds.entries()) {
        if (!feed.items) continue;

        const config = this.client.settings.guilds.get(guild.id, 'dofus', {});
        if (!config.rss?.news) continue;

        const channel = this.client.util.resolveChannel(config.rss.news, guild.channels.cache);
        if (!(channel instanceof TextChannel)) continue;

        const items = feed.items.filter(item => Date.parse(item.pubDate!) > this.lastPublication);
        if (!items?.length) continue;

        const common = {
          color: '#97a800',
          author: {
            name: this.categories[id].toUpperCase(),
            url: feed.link,
            iconURL: icons[this.categories[id]]
          },
          footer: {
            text: feed.copyright,
            iconURL: icons.dofus
          }
        };

        for (const item of items) {
          const embed = new MessageEmbed({
            ...common,
            title: item.title,
            url: item.link,
            description: (item.contentSnippet || '')
              .split('\n')[0]
          });

          void channel.send(embed);
        }
        return;
      }
    }

    this.lastPublication = Math.max(...feeds.map(feed => Date.parse(feed.pubDate)));
  }

}
