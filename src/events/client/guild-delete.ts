import { Listener } from 'discord-akairo';
import { Guild } from 'discord.js';
import { Logger } from '@/structures';

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
    this.client.logger.info(Logger.format(
      'discord',
      'guild-delete',
      { guild: guild.id }
    ));
  }

}
