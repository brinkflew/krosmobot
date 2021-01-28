import { Message } from 'discord.js';
import { Command } from '@/structures';
import { findPortalServer } from '@/utils';
import { GuildDocument, SetCommandArguments } from 'types';

/**
 * Change the color used in embed borders for the current guild.
 */
export default class SetCommand extends Command {

  public constructor() {
    super('set', {
      channel: 'guild',
      userPermissions: ['MANAGE_GUILD'],
      description: {
        'short': 'COMMAND_SET_DESCRIPTION_SHORT',
        'extended': 'COMMAND_SET_DESCRIPTION_EXTENDED',
        'example': 'COMMAND_SET_DESCRIPTION_EXAMPLE',
        'usage': 'COMMAND_SET_DESCRIPTION_USAGE'
      },
      args: [
        {
          id: 'channels.almanax',
          match: 'option',
          flag: 'almanax',
          type: 'textChannel',
          unordered: true
        },
        {
          id: 'channels.twitter',
          match: 'option',
          flag: 'twitter',
          type: 'textChannel',
          unordered: true
        },
        {
          id: 'dofus.server',
          match: 'option',
          flag: 'server',
          type: 'lowercase',
          unordered: true
        }
      ]
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, args: SetCommandArguments): Promise<Message> {
    try {
      if (!Object.values(args).find(val => val !== null)) {
        return this.warning(message, this.t('COMMAND_SET_RESPONSE_NO_KEYS', message));
      }

      const doc = <GuildDocument> this.getDocument(message) || {};

      doc.settings = doc.settings || {};
      doc.channels = doc.channels || {};
      doc.dofus = doc.dofus || {};
      const pairs: string[] = [];

      // Configure channels
      if (args['channels.almanax']) {
        doc.channels.almanax = args['channels.almanax'].id;
        pairs.push(this.t('COMMAND_SET_RESPONSE_PAIR', message, 'almanax', `#${args['channels.almanax'].name}`));
      }

      if (args['channels.twitter']) {
        doc.channels.news = args['channels.twitter'].id;
        pairs.push(this.t('COMMAND_SET_RESPONSE_PAIR', message, 'twitter', `#${args['channels.twitter'].name}`));
      }

      // Configure the Dofus server
      if (args['dofus.server']) {
        const server = await findPortalServer(args['dofus.server']);
        if (!server) throw new Error(`Unknown Dofus server: ${args['dofus.server']}`);
        doc.dofus.server = server;
        pairs.push(this.t('COMMAND_SET_RESPONSE_PAIR', message, 'dofus server', server.name));
      }

      await this.getProvider(message).update(message.guild!.id, doc);
      return this.success(message, this.t('COMMAND_SET_RESPONSE_MODIFIED', message, pairs));
    } catch (error) {
      return this.error(message, this.t('COMMAND_SET_RESPONSE_ERROR', message));
    }
  }

}
