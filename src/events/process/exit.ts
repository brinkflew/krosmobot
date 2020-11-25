import { Listener } from 'discord-akairo';
import { shutdown } from '@/utils';

/**
 * Does something once the process terminates.
 */
export default class extends Listener {
  constructor() {
    super('process-exit', {
      emitter: 'process',
      event: 'exit'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public async exec([code]: [number]) {
    await shutdown(this.client, code);
  }
}
