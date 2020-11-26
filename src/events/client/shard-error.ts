import { Listener } from 'discord-akairo';

/**
 * Emitted whenever a shard's WebSocket encounters a connection error.
 */
export default class extends Listener {
  constructor() {
    super('client-shard-error', {
      emitter: 'client',
      event: 'shardError'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(error: Error, id: number) {
    error.message = `WebSocket error on shard ${id}: ${error.message}`;
    this.client.logger.error(error);
  }
}
