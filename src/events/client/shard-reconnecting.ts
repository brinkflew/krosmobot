import { Listener } from 'discord-akairo';

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
    this.client.logger.info(`Shard ${id} reconnecting...`);
  }

}
