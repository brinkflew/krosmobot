import { Message } from 'discord.js';
import { Command } from '@/structures';
import { GuildDocument, GetCommandArguments } from 'types';

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
          id: 'channels.almanax',
          match: 'flag',
          flag: 'almanax'
        },
        {
          id: 'channels.twitter',
          match: 'flag',
          flag: 'twitter'
        },
        {
          id: 'dofus.server',
          match: 'flag',
          flag: 'server'
        },
        {
          id: 'settings.prefix',
          match: 'flag',
          flag: 'prefix'
        },
        {
          id: 'settings.color',
          match: 'flag',
          flag: 'color'
        },
        {
          id: 'settings.locale',
          match: 'flag',
          flag: 'locale'
        }
      ]
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, args: GetCommandArguments): Promise<Message> {
    try {
      const doc = <GuildDocument> this.getDocument(message) || {};
      const hasFlags = Object.values(args).includes(true);
      const pairs: string[] = [];

      if (!hasFlags || args['channels.almanax']) {
        const channel = doc?.channels?.almanax
          ? message.guild?.channels.cache.get(doc?.channels?.almanax)?.name
          : undefined;
        pairs.push(this.t('COMMAND_GET_RESPONSE_PAIR', message, 'almanax', channel ? `#${channel}` : channel));
      }

      if (!hasFlags || args['channels.twitter']) {
        const channel = doc?.channels?.news
          ? message.guild?.channels.cache.get(doc?.channels?.news)?.name
          : undefined;
        pairs.push(this.t('COMMAND_GET_RESPONSE_PAIR', message, 'twitter', channel ? `#${channel}` : channel));
      }

      if (!hasFlags || args['dofus.server']) pairs.push(this.t('COMMAND_GET_RESPONSE_PAIR', message, 'dofus server', doc?.dofus?.server?.name));
      if (!hasFlags || args['settings.prefix']) pairs.push(this.t('COMMAND_GET_RESPONSE_PAIR', message, 'prefix', doc?.settings?.prefix));
      if (!hasFlags || args['settings.color']) pairs.push(this.t('COMMAND_GET_RESPONSE_PAIR', message, 'color', doc?.settings?.color));
      if (!hasFlags || args['settings.locale']) pairs.push(this.t('COMMAND_GET_RESPONSE_PAIR', message, 'locale', doc?.settings?.locale));

      return this.embed(message, {
        author: {
          name: message.guild!.name,
          iconURL: message.guild!.iconURL() || undefined
        },
        description: this.t('COMMAND_GET_RESPONSE_PAIRS', message, pairs)
      });
    } catch (error) {
      return this.error(message, this.t('COMMAND_GET_RESPONSE_ERROR', message));
    }
  }

}
