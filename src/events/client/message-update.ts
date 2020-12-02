import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';

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
  public exec(oldMessage: Message) {
    this.client.logger.verbose(`Message from ${oldMessage.author} updated`);
  }

}
