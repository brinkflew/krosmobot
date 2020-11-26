import { Listener } from 'discord-akairo';
import { Message, Collection, Snowflake } from 'discord.js';

/**
 * Emitted whenever messages are deleted in bulk.
 */
export default class extends Listener {
  constructor() {
    super('client-message-delete-bulk', {
      emitter: 'client',
      event: 'messageDeleteBulk'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(messages: Collection<Snowflake, Message>) {
    this.client.logger.verbose(`Messages deleted in bulk: ${messages.size}`);
  }
}
