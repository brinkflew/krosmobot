import { Listener } from 'discord-akairo';
import { shutdown } from '@/utils';

/**
 * Does something when the client encounters an error.
 */
export default class extends Listener {
  constructor() {
    super('client-error', {
      emitter: 'client',
      event: 'error'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec([error]: [Error]) {
    this.client.logger.error(error);
    if (this.client.ws.status === 5) shutdown(this.client, 1);
  }
}
