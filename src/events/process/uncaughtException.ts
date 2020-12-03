import { Listener } from 'discord-akairo';
import { shutdown } from '@/utils';

/**
 * Does something when the process encounters an error it cannot recover from.
 */
export default class extends Listener {

  public constructor() {
    super('process-uncaught-exception', {
      emitter: 'process',
      event: 'uncaughtException'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(error: string | Error) {
    this.client.logger.error(error);
    void shutdown(this.client, 1);
  }

}
