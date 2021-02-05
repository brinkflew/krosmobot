import { Listener } from 'discord-akairo';
import { CloseEvent } from 'discord.js';
import { Logger } from '@/structures';

/**
 * Emitted when a shard's WebSocket disconnects and will no longer reconnect.
 */
export default class extends Listener {

  public constructor() {
    super('client-shard-disconnect', {
      emitter: 'client',
      event: 'shardDisconnect'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(event: CloseEvent, id: number) {
    this.client.metrics.dec('discord.shards');
    this.client.logger.warning(Logger.format(
      `discord: shard ${id}`,
      'shard-disconnect',
      { code: event.code, reason: event.reason }
    ));
  }

}
