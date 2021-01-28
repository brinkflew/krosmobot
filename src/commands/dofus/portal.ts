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
        'example': 'COMMAND_PORTAL_DESCRIPTION_EXAMPLE',
        'usage': 'COMMAND_PORTAL_DESCRIPTION_USAGE'
      }
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, { dimension, server }: { dimension: string; server: { id: string; name: string } | null }) {
    if (!server) return this.error(message, this.t('COMMAND_PORTAL_RESPONSE_NOSERVER', message));
    const url = `${URLS.DOFUS_PORTALS}/portails/${server.id}`;
    const scraped = await Scraper.scrape({ language: 'fr', url, fields: schema });
    if (!scraped.data?.length) return this.error(message, this.t('COMMAND_PORTAL_RESPONSE_NODATA', message, server));

    const generateEmbed = (data: any): MessageEmbed => this.craftEmbed(message, {
      author: {
        url,
        name: this.t('COMMAND_PORTAL_RESPONSE_TO', message, data.dimension),
        iconURL: `${URLS.DOFUS_PORTALS}/images/servers/${server.name.replace(/\s/g, '')}-min.png`
      },
      url,
      thumbnail: { url: `${URLS.DOFUS_PORTALS}/${(<string>data[`images.dimension`]).replace('../', '')}` },
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
          ? this.t('COMMAND_PORTAL_RESPONSE_UPDATED', message, data.update, server.name)
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

  /**
   * Parses the arguments.
   */
  // @ts-ignore unused-declaration
  private *args(message: Message) {
    const args = {
      dimension: yield { type: 'dofusDimension' },
      server: yield { type: 'dofusServer' }
    };

    if (!args.server && message.guild) {
      const doc = this.getDocument(message);
      if (doc?.dofus?.server?.id) args.server = doc?.dofus?.server;
    }

    return args;
  }

}
