import { Message } from 'discord.js';
import { Command } from '@/structures';
import { GuildDocument } from 'types';

/**
 * Change the color used in embed borders for the current guild.
 */
export default class SetCommand extends Command {

  public constructor() {
    super('get', {
      channel: 'guild',
      userPermissions: ['MANAGE_GUILD'],
      description: {
        'short': 'COMMAND_GET_DESCRIPTION_SHORT',
        'extended': 'COMMAND_GET_DESCRIPTION_EXTENDED',
        'example': 'COMMAND_GET_DESCRIPTION_EXAMPLE',
        'usage': 'COMMAND_GET_DESCRIPTION_USAGE'
      },
      args: [
        {
          id: 'keys',
          match: 'separate',
          type: 'lowercase'
        }
      ]
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, args: { keys: string[] }): Promise<Message> {
    args.keys = args.keys || [];
    const hasFlags = Boolean(args.keys.length);
    const pairs: string[] = [];
    const doc = <GuildDocument> this.getDocument(message) || {};

    const consume = (key: string, value: any) => {
      pairs.push(this.t('COMMAND_GET_RESPONSE_PAIR', message, key, value));
      args.keys.splice(args.keys.indexOf(key), 1);
    };

    if (!hasFlags || args.keys.includes('almanax')) {
      const channel = doc?.channels?.almanax
        ? message.guild?.channels.cache.get(doc?.channels?.almanax)?.name
        : undefined;
      consume('almanax', channel ? `#${channel}` : channel);
    }

    if (!hasFlags || args.keys.includes('twitter')) {
      const channel = doc?.channels?.news
        ? message.guild?.channels.cache.get(doc?.channels?.news)?.name
        : undefined;
      consume('twitter', channel ? `#${channel}` : channel);
    }

    if (!hasFlags || args.keys.includes('dofus-server')) consume('dofus-server', doc?.dofus?.server?.name);
    if (!hasFlags || args.keys.includes('prefix')) consume('prefix', doc?.settings?.prefix);
    if (!hasFlags || args.keys.includes('color')) consume('color', doc?.settings?.color);
    if (!hasFlags || args.keys.includes('locale')) consume('locale', doc?.settings?.locale);

    if (args.keys.length) void this.warning(message, this.t('COMMAND_GET_RESPONSE_INVALID_KEYS', message, args.keys));
    if (!pairs.length) return this.warning(message, this.t('COMMAND_GET_RESPONSE_NO_KEYS', message));

    return this.embed(message, {
      author: {
        name: message.guild!.name,
        iconURL: message.guild!.iconURL() || undefined
      },
      description: this.t('COMMAND_GET_RESPONSE_PAIRS', message, pairs)
    });
  }

}
