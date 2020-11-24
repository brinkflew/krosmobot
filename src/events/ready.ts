import { Listener } from 'discord-akairo';

/**
 * Does something once the client is ready.
 */
export default class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec() {
    console.log('Ready!');
  }
}
