import { Command } from '@/structures';
import { Message } from 'discord.js';
import { DOFUS } from '@/constants';
import { DofusTransport } from 'types';

/**
 * Fetches the Dofus portal position for a dimension on a server.
 */
export default class ZaapCommand extends Command {

  public constructor() {
    super('zaap', {
      aliases: ['transport', 'trans', 'travel'],
      description: {
        'short': 'COMMAND_ZAAP_DESCRIPTION_SHORT',
        'extended': 'COMMAND_ZAAP_DESCRIPTION_EXTENDED',
        'example': 'COMMAND_ZAAP_DESCRIPTION_EXAMPLE'
      },
      args: [
        {
          id: 'coords',
          type: 'dofusCoordinates',
          match: 'phrase',
          description: 'COMMAND_ZAAP_DESCRIPTION_ARGUMENT_COORDINATES'
        }
      ]
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, args: { coords: { x: number; y: number; world: string } | null }) {
    if (!args.coords) return this.error(message, this.t('COMMAND_ZAAP_RESPONSE_NO_COORDINATES', message));

    const { coords } = args;
    const transports = this.distance(message, coords);

    return this.embed(message, {
      author: { name: this.t('COMMAND_ZAAP_RESPONSE_TITLE', message, coords) },
      description: transports.join('\n'),
      footer: { text: this.t('COMMAND_ZAAP_RESPONSE_FOOTER', message) }
    });
  }

  /**
   * Get a list of the clostest transports to a coordinate, up to the closest zaap portal.
   * @param message Message that triggered the command
   * @param coords Coordinates to find the closest transports to
   */
  public distance(message: Message, coords: { x: number; y: number; world: string }) {
    let distances: DofusTransport[] = [];

    DOFUS.ZAAPS.forEach(zaap => {
      if (zaap.world !== 'main') return;
      const distance = Math.abs(zaap.x - coords.x) + Math.abs(zaap.y - coords.y);
      distances.push({ ...zaap, distance });
    });

    distances = distances.sort((a, b) => a.distance - b.distance);

    const transports: string[] = [];

    for (const transport of distances) {
      const emoji = this.client.util.resolveEmoji(`dofus_${transport.type}`, this.client.emojis.cache);
      const type = this.t(`DOFUS_TRANSPORT_${transport.type}`.toUpperCase(), message);
      const zone = this.t(`DOFUS_ZONE_${transport.world}_${transport.zone}`.toUpperCase(), message);
      const translated = this.t(
        'COMMAND_ZAAP_RESPONSE_DESCRIPTION',
        message,
        emoji?.toString(),
        type,
        zone,
        transport.x,
        transport.y,
        transport.distance
      );
      transports.push(translated);
      if (transport.type === 'zaap') break;
    }

    return transports;
  }

}
