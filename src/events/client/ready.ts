import { Listener } from 'discord-akairo';

/**
 * Does something once the client is ready.
 */
export default class extends Listener {
  constructor() {
    super('client-ready', {
      emitter: 'client',
      event: 'ready'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec() {
    this.client.logger.success('Client ready');
  }
}
