import { Listener } from 'discord-akairo';
import { Role } from 'discord.js';
import { Logger } from '@/structures';

/**
 * Emitted whenever a role is updated.
 */
export default class extends Listener {

  public constructor() {
    super('client-role-update', {
      emitter: 'client',
      event: 'roleUpdate'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(oldRole: Role, newRole: Role) {
    this.client.logger.verbose(Logger.format(
      'discord',
      'role-update',
      {
        role: `${oldRole.id} -> ${newRole.id}`,
        guild: oldRole.guild.id
      }
    ));
  }

}
