import { Listener } from 'discord-akairo';

/**
 * Does something when the client emits a debugging event.
 */
export default class extends Listener {

  public constructor() {
    super('twitter-end', {
      emitter: 'twitter',
      event: 'end'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec() {
    this.client.logger.warning(`Twitter service stopped`);
  }

}
