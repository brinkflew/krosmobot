import { Listener } from 'discord-akairo';

/**
 * Does something when the client emits a debugging event.
 */
export default class extends Listener {
  constructor() {
    super('client-debug', {
      emitter: 'client',
      event: 'debug'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(description: string) {
    this.client.logger.debug(description);
  }
}
