import { Listener } from 'discord-akairo';
import { shutdown } from '@/utils';
import { Logger } from '@/structures';

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
    this.client.logger.warning(Logger.format('process', 'sighup', undefined, 'Signal captured'));
    void shutdown(this.client, 1);
  }

}
