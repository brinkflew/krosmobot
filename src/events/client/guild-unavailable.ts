import { Listener } from 'discord-akairo';
import { Guild } from 'discord.js';
import { Logger } from '@/structures';

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
    this.client.logger.warning(Logger.format(
      'discord',
      'guild-unavailable',
      { guild: guild.id }
    ));
  }

}
