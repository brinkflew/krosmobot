import { Listener } from 'discord-akairo';

/**
 * Does something when the client emits a warning.
 */
export default class extends Listener {
  constructor() {
    super('client-warning', {
      emitter: 'client',
      event: 'warn'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec([warning]: [string]) {
    this.client.logger.warning(warning);
  }
}
