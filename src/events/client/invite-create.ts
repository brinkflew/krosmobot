import { Listener } from 'discord-akairo';
import { Invite } from 'discord.js';

/**
 * Does something when an invite is created for a guild or a channel.
 * Only triggers if the client has `MANAGE_GUILD` permissions for the guild,
 * or `MANAGE_CHANNEL` permissions for the channel.
 */
export default class extends Listener {

  public constructor() {
    super('client-invite-create', {
      emitter: 'client',
      event: 'inviteCreate'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(invite: Invite) {
    this.client.logger.info(`Invite created ${invite.guild ? `in guild ${invite.guild.id}` : ''}: ${invite.code}`);
  }

}
