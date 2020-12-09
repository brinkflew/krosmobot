import { Listener } from 'discord-akairo';

/**
 * Does something when the client emits a debugging event.
 */
export default class extends Listener {

  public constructor() {
    super('twitter-error', {
      emitter: 'twitter',
      event: 'error'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(error: any) {
    if (!(error instanceof Error)) error = new Error(typeof error === 'string' ? error : 'Twitter error');
    this.client.logger.error(error);
  }

}
