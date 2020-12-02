import { Listener } from 'discord-akairo';
import { shutdown } from '@/utils';

/**
 * Does something once a SIGHUP is capture.
 */
export default class extends Listener {

  public constructor() {
    super('process-sighup', {
      emitter: 'process',
      event: 'SIGHUP'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec() {
    this.client.logger.warning('Captured SIGHUP');
    void shutdown(this.client, 1);
  }

}
