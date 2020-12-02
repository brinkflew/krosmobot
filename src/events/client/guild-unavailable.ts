import { Listener } from 'discord-akairo';
import { Guild } from 'discord.js';

/**
 * Does something when a member of a guild becomes unavailable,
 * likely due to server outage.
 */
export default class extends Listener {

  public constructor() {
    super('client-guild-unavailable', {
      emitter: 'client',
      event: 'guildUnavailable'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(guild: Guild) {
    this.client.logger.warning(`Guild ${guild} has become unavailable`);
  }

}
