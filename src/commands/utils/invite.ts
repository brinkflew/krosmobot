import { Command } from '@/structures';
import { Message } from 'discord.js';
import { DEFAULTS } from '@/constants';

/**
 * Prepare an invite to add the client to a guild.
 */
export default class InviteCommand extends Command {

  public constructor() {
    super('invite', {
      userPermissions: ['CREATE_INSTANT_INVITE'],
      clientPermissions: ['ADD_REACTIONS'],
      channel: 'guild',
      description: {
        'short': 'COMMAND_INVITE_DESCRIPTION_SHORT',
        'extended': 'COMMAND_INVITE_DESCRIPTION_EXTENDED',
        'example': 'COMMAND_INVITE_DESCRIPTION_EXAMPLE'
      }
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message) {
    const { invite } = this.client;

    if (!invite) return this.error(message, message.t('COMMAND_INVITE_RESPONSE_NOLINK'));

    return this.embed(message, {
      title: message.t('COMMAND_INVITE_RESPONSE_TITLE', this.client.user?.username || DEFAULTS.CLIENTNAME),
      url: invite,
      footer: { text: message.t('COMMAND_INVITE_RESPONSE_FOOTER') }
    });
  }

}
