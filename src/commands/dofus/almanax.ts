import { Command, Scraper } from '@/structures';
import { Message } from 'discord.js';
import { almanax as schema } from '@/scraping-schemas';
import { AlmanaxDocument } from 'types';
import { MS_PER_HOUR } from '@/constants';

/**
 * Fetches the Dofus almanax for a specific date.
 */
export default class AlmanaxCommand extends Command {

  public constructor() {
    super('almanax', {
      aliases: ['alma'],
      description: {
        'short': 'COMMAND_ALMANAX_DESCRIPTION_SHORT',
        'extended': 'COMMAND_ALMANAX_DESCRIPTION_EXTENDED',
        'example': 'COMMAND_ALMANAX_DESCRIPTION_EXAMPLE',
        'usage': 'COMMAND_ALMANAX_DESCRIPTION_USAGE'
      },
      args: [
        {
          id: 'extended',
          match: 'flag',
          flag: 'details'
        },
        {
          id: 'offset',
          match: 'phrase',
          type: 'string'
        }
      ]
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, { extended, offset }: { extended: boolean; offset: string }) {
    const { providers } = this.client;

    const date = this.parseDate(offset);
    if (!date) return this.error(message, this.t('COMMAND_ALMANAX_RESPONSE_DATE_ERROR', message, date));

    const language = this.getLocale(message).id;
    const id = `${language}:${date}`;
    let fetched = providers.almanax.fetch(id);

    if (!fetched) {
      const url = `http://www.krosmoz.com/${language}/almanax/${date}`;
      const scraped = await Scraper.scrape({ language, url, fields: schema });

      if (!scraped.data?.length) return this.error(message, 'COMMAND_ALMANAX_RESPONSE_SCRAPE_ERROR');
      fetched = await providers.almanax.create(id, { ...scraped.data[0], url });
    }

    const almanax = <AlmanaxDocument> fetched;
    const embed = this.craftEmbed(message, {
      author: {
        name: this.t('COMMAND_ALMANAX_RESPONSE_ALMANAX', message, almanax.day, almanax.month),
        url: almanax.url,
        iconURL: almanax.images.meryde
      },
      thumbnail: { url: almanax.images.item },
      fields: [
        { name: almanax.title, value: almanax.offering, inline: true },
        { name: almanax.bonus.title, value: almanax.bonus.description, inline: true }
      ]
    });

    if (extended) {
      embed.setDescription(almanax.meryde);
      embed.addField(this.t('COMMAND_ALMANAX_RESPONSE_DESCRIPTION', message), almanax.description);
    }

    return this.embed(message, embed);
  }

  /**
   * Get an input as a string and parse it to a vald date.
   * The input can be a valid date representation in the format `dd/mm`,
   * or an offset in the format `+x` or `-x` (with `x` the number of days
   * to add or substract to the current date).
   * @param input String to parse into a valid date
   */
  private parseDate(input: string): string | null {
    if (!input) return this.formatDate();

    const matches = /^(([0-2]?[0-9])|(3[0-1]))([/.\s-])((1[0-2])|(0?[0-9]))/i.exec(input);
    if (matches) {
      const date = Date.parse(`${new Date().getFullYear()}-${this.pad(matches[5])}-${this.pad(matches[1])}`);
      if (!date) return null;
      return this.formatDate(date);
    }

    const offset = parseInt(input, 10);
    if (isNaN(offset)) return null;
    const date = new Date(Date.now() + MS_PER_HOUR);
    return this.formatDate(date.setDate(date.getDate() + offset));
  }

  /**
   * Format a date to the standard format to use on the almanax' website.
   * @param date Date to format
   */
  private formatDate(date: Date | number = Date.now()): string {
    if (typeof date === 'number') date = new Date(date + MS_PER_HOUR);
    return date.toISOString().split('T')[0];
  }


  /**
 * Adds zero-padding to a number.
 * @param n Number to pad
 * @param length Length to reach
 */
  private pad(n: number | string, l = 2): string {
    const s = `${n}`;
    return `${'0'.repeat(Math.max(l - s.split('.')[0].length, 0))}${s}`;
  }

}
