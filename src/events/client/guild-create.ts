import { Listener } from 'discord-akairo';
import { Guild } from 'discord.js';
import { Logger } from '@/structures';

/**
 * Does something when the client joins a guild.
 */
export default class extends Listener {

  public constructor() {
    super('client-guild-create', {
      emitter: 'client',
      event: 'guildCreate'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(guild: Guild) {
    this.client.metrics.inc('discord.guilds');
    this.client.logger.info(Logger.format(
      'discord',
      'guild-joined',
      { guild: guild.id }
    ));
  }

}
