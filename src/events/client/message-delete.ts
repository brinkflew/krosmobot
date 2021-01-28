import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import { Logger } from '@/structures';

/**
 * Emitted whenever a message is deleted.
 */
export default class extends Listener {

  public constructor() {
    super('client-message-delete', {
      emitter: 'client',
      event: 'messageDelete'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(message: Message) {
    this.client.logger.verbose(Logger.format(
      'discord',
      'message-delete',
      { message: message.id }
    ));

    const { polls } = this.client.providers;
    if (!polls.cache.has(message.id)) return;
    void polls.delete(message.id);
  }

}
