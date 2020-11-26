import { Listener } from 'discord-akairo';
import { Role } from 'discord.js';

/**
 * Emitted whenever a role is updated.
 */
export default class extends Listener {
  constructor() {
    super('client-role-update', {
      emitter: 'client',
      event: 'roleUpdate'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(oldRole: Role, newRole: Role) {
    this.client.logger.verbose(`Role ${oldRole} updated in guild ${oldRole.guild} -> ${newRole}`);
  }
}
