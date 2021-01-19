import { Listener } from 'discord-akairo';
import { shutdown } from '@/utils';
import { Logger } from '@/structures';

/**
 * Does something once a SIGINT is captured (aka Ctrl+C is pressed).
 */
export default class extends Listener {

  public constructor() {
    super('process-sigint', {
      emitter: 'process',
      event: 'SIGINT'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec() {
    this.client.logger.warning(Logger.format('process', 'sigint', undefined, 'Signal captured (Ctrl-C)'));
    void shutdown(this.client, 2);
  }

}
