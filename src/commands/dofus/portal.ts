import { Command, Scraper } from '@/structures';
import { Message, MessageEmbed } from 'discord.js';
import { portal as schema } from '@/scraping-schemas';
import { findPortalServer } from '@/utils';

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
        'example': 'COMMAND_PORTAL_DESCRIPTION_EXAMPLE',
        'usage': 'COMMAND_PORTAL_DESCRIPTION_USAGE'
      },
      args: [
        {
          id: 'dimension',
          type: [
            ['enu', 'enutrof', 'enutrosor'],
            ['eca', 'ecaflip', 'ecaflipus'],
            ['sram', 'srambad'],
            ['xel', 'xelor', 'xelorium']
          ]
        },
        {
          id: 'server',
          type: 'lowercase'
        }
      ]
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, { dimension, server }: { dimension: string; server: string }) {
    const portalServer: { id: string; name: string } = server
      ? await findPortalServer(this, message, server)
      : message.guild ? this.get(message.guild || message.author, 'dofus', {}).server : null;
    if (!portalServer) return this.error(message, this.t('COMMAND_PORTAL_RESPONSE_NOSERVER', message));

    const baseUrl = 'https://dofus-portals.fr';
    const url = `${baseUrl}/portails/${portalServer.id}`;
    const scraped = await Scraper.scrape({ language: 'fr', url, fields: schema });
    if (!scraped.data?.length) return this.error(message, this.t('COMMAND_PORTAL_RESPONSE_NODATA', message));

    const generateEmbed = (data: any): MessageEmbed => this.craftEmbed(message, {
      author: {
        url,
        name: this.t('COMMAND_PORTAL_RESPONSE_TO', message, data.dimension),
        iconURL: `${baseUrl}/images/servers/${portalServer.name.replace(/\s/g, '')}-min.png`
      },
      url,
      thumbnail: { url: `${baseUrl}/${(<string>data['images.dimension']).replace('../', '')}` },
      fields: [
        {
          name: this.t('COMMAND_PORTAL_REPONSE_POSITION', message),
          value: data.position
            ? data.position
            : this.t('COMMAND_PORTAL_REPONSE_POSITION_UNKNOWN', message),
          inline: true
        },
        {
          name: this.t('COMMAND_PORTAL_REPONSE_USES', message),
          value: this.t('COMMAND_PORTAL_RESPONSE_USES_REMAINING', message, data.uses || 0),
          inline: true
        },
        {
          name: this.t('COMMAND_PORTAL_RESPONSE_CYCLE', message, data['cycle.title']),
          value: data['cycle.description']
        }
      ],
      footer: {
        text: data.update
          ? this.t('COMMAND_PORTAL_RESPONSE_UPDATED', message, data.update, portalServer.name)
          : undefined
      }
    });

    switch (dimension) {
      case 'enu': return this.embed(message, generateEmbed(scraped.data.find((data: any) => data.dimension === 'Enutrosor')));
      case 'xel': return this.embed(message, generateEmbed(scraped.data.find((data: any) => data.dimension === 'Xelorium')));
      case 'eca': return this.embed(message, generateEmbed(scraped.data.find((data: any) => data.dimension === 'Ecaflipus')));
      case 'sram': return this.embed(message, generateEmbed(scraped.data.find((data: any) => data.dimension === 'Srambad')));
      default: return scraped.data.map((data: any) => this.embed(message, generateEmbed(data)));
    }
  }

}
