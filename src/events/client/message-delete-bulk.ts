import { Listener } from 'discord-akairo';
import { Message, Collection, Snowflake } from 'discord.js';
import { Logger } from '@/structures';

/**
 * Emitted whenever messages are deleted in bulk.
 */
export default class extends Listener {

  public constructor() {
    super('client-message-delete-bulk', {
      emitter: 'client',
      event: 'messageDeleteBulk'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(messages: Collection<Snowflake, Message>) {
    this.client.logger.verbose(Logger.format(
      'discord',
      'messages-delete',
      { deleted: `${messages.size} messages` }
    ));
  }

}
