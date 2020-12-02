import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import { oneLine } from 'common-tags';

/**
 * Emitted whenever a message is created.
 */
export default class extends Listener {

  public constructor() {
    super('client-message', {
      emitter: 'client',
      event: 'message'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(message: Message) {
    this.client.logger.verbose(oneLine`
      Message ${message.author.id === this.client.user?.id ? 'sent to' : `received from ${message.author.id} in`}
      channel ${message.channel}
    `);
  }

}
