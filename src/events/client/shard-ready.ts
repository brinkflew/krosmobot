import { Listener } from 'discord-akairo';
import metrics from '@/metrics';

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
  public exec(id: number) {
    this.client.logger.success(`Shard ${id} ready`);
    metrics.discord.shards.inc();
  }

}
