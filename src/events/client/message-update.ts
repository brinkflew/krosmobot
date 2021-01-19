import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import { Logger } from '@/structures';

/**
 * Emitted whenever a message is deleted.
 */
export default class extends Listener {

  public constructor() {
    super('client-message-update', {
      emitter: 'client',
      event: 'messageUpdate'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(oldMessage: Message, newMessage: Message) {
    this.client.logger.verbose(Logger.format(
      'discord',
      'message-updated',
      { message: `${oldMessage.id} -> ${newMessage.id}` }
    ));
  }

}
