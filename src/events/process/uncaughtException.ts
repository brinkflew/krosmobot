import { Listener } from 'discord-akairo';
import { shutdown } from '@/utils';

/**
 * Does something when the process encounters an error it cannot recover from.
 */
export default class extends Listener {
  constructor() {
    super('process-uncaught-exception', {
      emitter: 'process',
      event: 'uncaughtException'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public async exec([error]: [string | Error]) {
    this.client.logger.error(error);
    shutdown(this.client, 1);
  }
}
