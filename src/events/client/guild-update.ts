import { Listener } from 'discord-akairo';
import { Guild } from 'discord.js';
import { Logger } from '@/structures';

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
    this.client.logger.verbose(Logger.format(
      'discord',
      'guild-updated',
      { guild: `${oldGuild.id} -> ${newGuild.id}` }
    ));

    if (oldGuild.id === newGuild.id) return;
    void this.client.providers.guilds.set(oldGuild.id, 'id', newGuild.id);
  }

}
