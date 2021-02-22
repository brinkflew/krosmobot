import { Command, Scraper } from '@/structures';
import { Message, MessageEmbed } from 'discord.js';
import { portal as schema } from '@/scraping-schemas';
import { URLS } from '@/constants';

/**
 * Fetches the Dofus portal position for a dimension on a server.
 */
export default class PortalCommand extends Command {

  public constructor() {
    super('portal', {
      aliases: ['pos', 'portals'],
      description: {
        'short': 'COMMAND_PORTAL_DESCRIPTION_SHORT',
        'extended': 'COMMAND_PORTAL_DESCRIPTION_EXTENDED',
        'example': 'COMMAND_PORTAL_DESCRIPTION_EXAMPLE'
      },
      args: [
        {
          id: 'dimension',
          type: 'dofusDimension',
          match: 'phrase',
          unordered: true,
          description: 'COMMAND_PORTAL_DESCRIPTION_ARGUMENT_DIMENSION'
        },
        {
          id: 'server',
          type: 'dofusServer',
          match: 'phrase',
          unordered: true,
          description: 'COMMAND_PORTAL_DESCRIPTION_ARGUMENT_SERVER'
        }
      ]
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, { dimension, server }: { dimension: string; server: { id: string; name: string } | null }) {
    if (!server) return this.error(message, message.t('COMMAND_PORTAL_RESPONSE_NOSERVER'));
    const url = `${URLS.DOFUS_PORTALS}/portails/${server.id}`;
    const scraped = await Scraper.scrape({ language: 'fr', url, fields: schema });
    if (!scraped.data?.length) return this.error(message, message.t('COMMAND_PORTAL_RESPONSE_NODATA', server));

    const generateEmbed = (data: any): MessageEmbed => this.craftEmbed(message, {
      author: {
        url,
        name: message.t('COMMAND_PORTAL_RESPONSE_TO', data.dimension),
        iconURL: `${URLS.DOFUS_PORTALS}/images/servers/${server.name.replace(/\s/g, '')}-min.png`
      },
      url,
      thumbnail: { url: `${URLS.DOFUS_PORTALS}/${(<string>data[`images.dimension`]).replace('../', '')}` },
      fields: [
        {
          name: message.t('COMMAND_PORTAL_REPONSE_POSITION'),
          value: data.position
            ? data.position
            : message.t('COMMAND_PORTAL_REPONSE_POSITION_UNKNOWN'),
          inline: true
        },
        {
          name: message.t('COMMAND_PORTAL_REPONSE_USES'),
          value: message.t('COMMAND_PORTAL_RESPONSE_USES_REMAINING', data.uses || 0),
          inline: true
        },
        {
          name: message.t('COMMAND_PORTAL_RESPONSE_CYCLE', data['cycle.title']),
          value: data['cycle.description']
        }
      ],
      footer: {
        text: data.update
          ? message.t('COMMAND_PORTAL_RESPONSE_UPDATED', data.update, server.name)
          : undefined
      }
    });

    const getDimensionData = (name: string) => {
      const data: { [key: string]: unknown } = {};
      Object.entries(scraped.data![0])
        .filter(([key]) => key.startsWith(name))
        .map(([key, value]) => data[key.replace(`${name}.`, '')] = value);
      return data;
    };

    switch (dimension) {
      case 'ecaflipus': return this.embed(message, generateEmbed(getDimensionData(dimension)));
      case 'enutrosor': return this.embed(message, generateEmbed(getDimensionData(dimension)));
      case 'srambad': return this.embed(message, generateEmbed(getDimensionData(dimension)));
      case 'xelorium': return this.embed(message, generateEmbed(getDimensionData(dimension)));
      default: return ['ecaflipus', 'enutrosor', 'srambad', 'xelorium']
        .map((dimension: string) => this.embed(message, generateEmbed(getDimensionData(dimension))));
    }
  }

}
