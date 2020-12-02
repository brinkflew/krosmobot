import { Listener } from 'discord-akairo';
import { MessageReaction, User } from 'discord.js';
import { oneLine } from 'common-tags';

/**
 * Emitted whenever a reaction is added to a cached message.
 */
export default class extends Listener {

  public constructor() {
    super('client-message-reaction-add', {
      emitter: 'client',
      event: 'messageReactionAdd'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(reaction: MessageReaction, user: User) {
    this.client.logger.verbose(oneLine`
      User ${user} reacted to message ${reaction.message}
      from ${reaction.message.author}
    `);
  }

}
