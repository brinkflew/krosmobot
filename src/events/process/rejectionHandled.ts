import { Listener } from 'discord-akairo';
import { Logger } from '@/structures';

/**
 * Does something when the process handles a promise rejection.
 */
export default class extends Listener {

  public constructor() {
    super('process-rejection-handled', {
      emitter: 'process',
      event: 'rejectionHandled'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec() {
    return this.client.logger.verbose(Logger.format('process', 'rejection-handled'));
  }

}
