import { Listener } from 'discord-akairo';
import { shutdown } from '@/utils';
import { Logger } from '@/structures';

/**
 * Does something once a SIGTERM is captured.
 */
export default class extends Listener {

  public constructor() {
    super('process-sigterm', {
      emitter: 'process',
      event: 'SIGTERM'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec() {
    this.client.logger.warning(Logger.format('process', 'sigterm', undefined, 'Signal captured'));
    void shutdown(this.client, 15);
  }

}
