import { Listener } from 'discord-akairo';

/**
 * Does something once process emits a warning.
 */
export default class extends Listener {
  constructor() {
    super('process-warning', {
      emitter: 'process',
      event: 'warning'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public async exec([warning]: [Error]) {
    return this.client.logger.warning(warning.message);
  }
}
