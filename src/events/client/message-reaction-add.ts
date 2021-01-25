import { Listener } from 'discord-akairo';
import { MessageReaction, User } from 'discord.js';
import { pollReactions } from '@/constants';

/**
 * Emitted whenever a reaction is added to an existing message.
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
    if (user.id === this.client.user?.id) return;
    const { polls } = this.client.providers;
    if (!polls.items.has(reaction.message.id)) return;

    let index = pollReactions.indexOf(reaction.emoji.name);
    if (index < 0) return;
    if (index === 0) {
      const author: string = polls.get(reaction.message.id, 'author');
      if (author !== user.id) return;
      this.client.emit('pollClose', reaction.message);
      return;
    }

    const answers: string[][] = polls.get(reaction.message.id, 'answers');
    const multi: boolean = polls.get(reaction.message.id, 'multi', true);
    index -= 1;

    if (!multi) {
      answers.forEach((answer, ind) => {
        const position = answer.indexOf(user.id);
        if (position < 0) return;
        answers[ind] = new Array(...answers[index]);
        answers[ind].splice(position, 1);
        reaction.message.reactions.cache.forEach(r => {
          if (r.emoji.name === reaction.emoji.name) return;
          if (!r.users.cache.has(user.id)) return;
          void r.users.remove(user);
        });
      });
    }

    if (answers[index].includes(user.id)) return;
    answers[index] = new Array(...answers[index]);
    answers[index].push(user.id);
    void polls.set(reaction.message.id, ['answers'], [answers], false);
  }

}
