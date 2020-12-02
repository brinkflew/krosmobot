import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import { oneLine } from 'common-tags';

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
    this.client.logger.verbose(oneLine`
      Message from ${message.author}
      in channel ${message.channel}
      deleted
    `);
  }

}
