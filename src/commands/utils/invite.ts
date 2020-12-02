import { Command } from '@/structures';
import { Message } from 'discord.js';
import { DEFAULT_CLIENTNAME } from '@/constants';

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
        'example': 'COMMAND_INVITE_DESCRIPTION_EXAMPLE',
        'usage': 'COMMAND_INVITE_DESCRIPTION_USAGE'
      }
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message) {
    const { invite } = this.client;

    if (!invite) return this.error(message, this.t('COMMAND_INVITE_RESPONSE_NOLINK', message));

    return this.embed(message, {
      title: this.t('COMMAND_INVITE_RESPONSE_TITLE',
        message, this.client.user?.username || process.env.KROSMOBOT_USERNAME || DEFAULT_CLIENTNAME),
      url: invite,
      footer: { text: this.t('COMMAND_INVITE_RESPONSE_FOOTER', message) }
    });
  }

}
