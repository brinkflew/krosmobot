import { Guild } from 'discord.js';
import { Listener } from 'discord-akairo';
import metrics from '@/metrics';
import { Logger } from '@/structures';

/**
 * Emitted when a shard turns ready.
 */
export default class extends Listener {

  public constructor() {
    super('client-shard-ready', {
      emitter: 'client',
      event: 'shardReady'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(id: number, unavailable: Set<Guild>) {
    const available = Math.max(this.client.guilds.cache.size - (unavailable?.size || 0), 0);
    this.client.logger.success(Logger.format(
      `discord: shard ${id}`,
      'shard-ready',
      { 'guilds available': available }
    ));
    metrics.discord.shards.inc();
  }

}
