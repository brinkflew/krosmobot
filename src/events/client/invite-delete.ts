import { Listener } from 'discord-akairo';
import { Invite } from 'discord.js';

/**
 * Does something when an invite is deleted in a guild or a channel.
 * Only triggers if the client has `MANAGE_GUILD` permissions for the guild,
 * or `MANAGE_CHANNEL` permissions for the channel.
 */
export default class extends Listener {
  constructor() {
    super('client-invite-delete', {
      emitter: 'client',
      event: 'inviteDelete'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(invite: Invite) {
    this.client.logger.verbose(`Invite deleted in guild ${invite.guild}: ${invite}`);
  }
}
