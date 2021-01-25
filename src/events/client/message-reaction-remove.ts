import { Listener } from 'discord-akairo';
import { MessageReaction, User } from 'discord.js';
import { pollReactions } from '@/constants';

/**
 * Emitted whenever a reaction is removed from an existing message.
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
    if (user.id === this.client.user?.id) return;
    const { polls } = this.client.providers;
    if (!polls.items.has(reaction.message.id)) return;

    let index = pollReactions.indexOf(reaction.emoji.name);
    if (index <= 0) return;

    index -= 1;
    const answers: string[][] = polls.get(reaction.message.id, 'answers');
    const position = answers[index].indexOf(user.id);
    if (position < 0) return;
    answers[index] = new Array(...answers[index]);
    answers[index].splice(position, 1);
    void polls.set(reaction.message.id, ['answers'], [answers], false);
  }

}
