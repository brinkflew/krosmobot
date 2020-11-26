import { Listener } from 'discord-akairo';

/**
 * Emitted when the client hits a rate limit while making a request.
 */
export default class extends Listener {
  constructor() {
    super('client-rate-limit', {
      emitter: 'client',
      event: 'rateLimit'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(info: { timeout: number, limit: number, method: string, path: string, route: string }) {
    this.client.logger.warning(`Rate limited, timeout: ${info.timeout} ms`);
  }
}
