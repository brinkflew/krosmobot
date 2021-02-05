import { Listener } from 'discord-akairo';
import { Logger } from '@/structures';

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
    this.client.metrics.dec('discord.shards');
    this.client.logger.info(Logger.format(`discord: shard ${id}`, 'shard-reconnecting'));
  }

}
