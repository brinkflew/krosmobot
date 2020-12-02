import { Listener } from 'discord-akairo';
import { Role } from 'discord.js';

/**
 * Emitted whenever a role is created.
 */
export default class extends Listener {

  public constructor() {
    super('client-role-create', {
      emitter: 'client',
      event: 'roleCreate'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(role: Role) {
    this.client.logger.verbose(`Role ${role} created in guild ${role.guild}`);
  }

}
