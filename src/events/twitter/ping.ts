import { Listener } from 'discord-akairo';

/**
 * Does something when the client emits a debugging event.
 */
export default class extends Listener {

  public constructor() {
    super('twitter-ping', {
      emitter: 'twitter',
      event: 'ping'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec() {
    this.client.logger.debug('Twitter ping');
  }

}
