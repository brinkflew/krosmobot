import { Listener } from 'discord-akairo';
import { MessageReaction, User } from 'discord.js';
import { oneLine } from 'common-tags';

/**
 * Emitted whenever a reaction is removed from a cached message.
 */
export default class extends Listener {

  public constructor() {
    super('client-message-reaction-remove', {
      emitter: 'client',
      event: 'messageReactionRemove'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(reaction: MessageReaction, user: User) {
    this.client.logger.verbose(oneLine`
      User ${user} remove reaction from message ${reaction.message}
      from ${reaction.message.author}
    `);
  }

}
