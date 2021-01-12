import { Listener } from 'discord-akairo';
import { Client, Logger } from '@/structures';

/**
 * Does something when the client emits a debugging event.
 */
export default class extends Listener {

  public constructor() {
    super('twitter-error', {
      emitter: 'twitter',
      event: 'error'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(error: any): Logger {
    if (error instanceof Error) return this.client.logger.error(error);
    if (typeof error === 'string') return this.client.logger.error(new Error(error));

    const symbol = Object
      .getOwnPropertySymbols(error)
      .find(sym => String(sym) === 'Symbol(Response internals)');

    if (!symbol) return this.client.logger.error(new Error('Undefined symbol on error: Symbol(Response internals)'));
    error = error[symbol];

    this.client.logger.error(new Error(`Twitter error: ${<string>error.status} - ${<string>error.statusText}`));
    this.client.streams.map(stream => process.nextTick(() => stream.destroy()));

    let delay = 0;
    if (error.status === 420) delay = 90;

    setTimeout(() => {
      const stream = (<Client> this.client).streamTweets();

      this.client.events.setEmitters({
        process,
        twitter: stream
      });

      this.client.events.reloadAll();
    }, delay * 1000);

    return this.client.logger.warning(`Twitter service errored: retrying in ${delay} seconds...`);
  }

}
