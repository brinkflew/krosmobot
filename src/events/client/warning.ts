import { Listener } from 'discord-akairo';
import { Logger } from '@/structures';

/**
 * Does something when the client emits a warning.
 */
export default class extends Listener {

  public constructor() {
    super('client-warning', {
      emitter: 'client',
      event: 'warn'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(warning: string) {
    this.client.logger.warning(Logger.format('discor', 'warning', undefined, warning));
  }

}
