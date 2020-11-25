import { Listener } from 'discord-akairo';
import { shutdown } from '@/utils';

/**
 * Does something once a SIGINT is captured (aka Ctrl+C is pressed).
 */
export default class extends Listener {
  constructor() {
    super('process-sigint', {
      emitter: 'process',
      event: 'SIGINT'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec() {
    this.client.logger.warning('Captured SIGINT (Ctrl-C)');
    shutdown(this.client, 2);
  }
}
