import { Listener } from 'discord-akairo';
import { Guild } from 'discord.js';

/**
 * Does something when the client joins a guild.
 */
export default class extends Listener {
  constructor() {
    super('client-guild-create', {
      emitter: 'client',
      event: 'guildCreate'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(guild: Guild) {
    this.client.logger.success(`Joined guild ${guild}`);
  }
}
