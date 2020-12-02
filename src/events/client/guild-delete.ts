import { Listener } from 'discord-akairo';
import { Guild } from 'discord.js';

/**
 * Does something when the client leaves a guild.
 */
export default class extends Listener {

  public constructor() {
    super('client-guild-delete', {
      emitter: 'client',
      event: 'guildDelete'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(guild: Guild) {
    this.client.logger.warning(`Left guild ${guild.id}`);
  }

}
