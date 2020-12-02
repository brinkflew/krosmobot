import { Listener } from 'discord-akairo';
import { Guild } from 'discord.js';

/**
 * Does something when a guild is updated.
 */
export default class extends Listener {

  public constructor() {
    super('client-guild-update', {
      emitter: 'client',
      event: 'guildUpdate'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(oldGuild: Guild, newGuild: Guild) {
    this.client.logger.verbose(`Guild ${oldGuild.id} has been updated -> ${newGuild.id}`);
  }

}
