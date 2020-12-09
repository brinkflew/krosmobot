import { Listener } from 'discord-akairo';

/**
 * Does something when the client emits a debugging event.
 */
export default class extends Listener {

  public constructor() {
    super('twitter-start', {
      emitter: 'twitter',
      event: 'start'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec() {
    this.client.logger.info(`Logged in to Twitter`);
  }

}
