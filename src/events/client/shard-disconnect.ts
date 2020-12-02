import { Listener } from 'discord-akairo';
import { CloseEvent } from 'discord.js';

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
    this.client.logger.warning(`Shard ${id} disconnected with code ${event.code}: ${event.reason}`);
  }

}
