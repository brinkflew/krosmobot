import { Listener } from 'discord-akairo';
import { Guild } from 'discord.js';
import metrics from '@/metrics';
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
    const { guilds } = metrics.discord;
    guilds.set(guilds.val() + 1);
    this.client.logger.info(Logger.format(
      'discord',
      'guild-joined',
      { guild: guild.id }
    ));
  }

}
