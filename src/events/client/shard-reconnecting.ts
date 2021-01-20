import { Listener } from 'discord-akairo';
import { Logger } from '@/structures';
import metrics from '@/metrics';

/**
 * Emitted when a shard is attempting to reconnect or re-identify.
 */
export default class extends Listener {

  public constructor() {
    super('client-shard-reconnecting', {
      emitter: 'client',
      event: 'shardReconnecting'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(id: number) {
    this.client.logger.info(Logger.format(`discord: shard ${id}`, 'shard-reconnecting'));
    metrics.discord.shards.dec();
  }

}
