import { Listener } from 'discord-akairo';
import { Logger } from '@/structures';

/**
 * Emitted when the client hits a rate limit while making a request.
 */
export default class extends Listener {

  public constructor() {
    super('client-rate-limit', {
      emitter: 'client',
      event: 'rateLimit'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(info: { timeout: number; limit: number; method: string; path: string; route: string }) {
    this.client.logger.warning(Logger.format('discord', 'rate-limited', { timeout: `${info.timeout} ms` }));
  }

}
