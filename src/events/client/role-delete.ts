import { Listener } from 'discord-akairo';
import { Role } from 'discord.js';
import { Logger } from '@/structures';

/**
 * Emitted whenever a role is deleted.
 */
export default class extends Listener {

  public constructor() {
    super('client-role-delete', {
      emitter: 'client',
      event: 'roleDelete'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(role: Role) {
    this.client.logger.verbose(Logger.format('discord', 'role-delete', { role: role.id, guild: role.guild.id }));
  }

}
