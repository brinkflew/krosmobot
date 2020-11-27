import { Command } from '@/structures';
import { Message } from 'discord.js';
import { DEFAULT_CLIENTNAME } from '@/constants';

/**
 * Prepare an invite to add the client to a guild.
 */
export default class InviteCommand extends Command {
  constructor() {
    super('invite', {
      userPermissions: ['CREATE_INSTANT_INVITE'],
      clientPermissions: ["ADD_REACTIONS"],
      channel: 'guild'
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message) {
    const invite = this.client.invite;
    
    if (!invite) return this.error(message, this.t('COMMAND_INVITE_RESPONSE_NOLINK', message));

    return this.embed(message, {
      title: this.t('COMMAND_INVITE_RESPONSE_TITLE',
        message, this.client.user?.username || process.env.KROSMOBOT_USERNAME || DEFAULT_CLIENTNAME),
      url: invite,
      footer: { text: this.t('COMMAND_INVITE_RESPONSE_FOOTER', message) }
    });
  }
}
