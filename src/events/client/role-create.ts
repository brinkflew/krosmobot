import { Listener } from 'discord-akairo';
import { Role } from 'discord.js';
import { Logger } from '@/structures';

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
    this.client.logger.verbose(Logger.format('discord', 'role-create', { role: role.id, guild: role.guild.id }));
  }

}
