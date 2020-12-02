import { Listener } from 'discord-akairo';

/**
 * Does something when the process encounters a promise rejection
 * that is not handled accordingly.
 */
export default class extends Listener {

  public constructor() {
    super('process-unhandled-rejection', {
      emitter: 'process',
      event: 'unhandledRejection'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec([error]: [string | Error]) {
    return this.client.logger.error(error);
  }

}
