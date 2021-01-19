import { Listener } from 'discord-akairo';
import { Logger } from '@/structures';

/**
 * Emitted whenever a shard's WebSocket encounters a connection error.
 */
export default class extends Listener {

  public constructor() {
    super('client-shard-error', {
      emitter: 'client',
      event: 'shardError'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(error: Error, id: number) {
    error.message = Logger.format(`discord: shard ${id}`, 'shard-error', undefined, error.message);
    this.client.logger.error(error);
  }

}
