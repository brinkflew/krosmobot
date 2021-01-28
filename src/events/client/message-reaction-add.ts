import { Listener } from 'discord-akairo';
import { MessageReaction, User } from 'discord.js';
import { EMOJIS } from '@/constants';
import { PollDocument } from 'types';

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

    const fetched = <PollDocument> polls.fetch(reaction.message.id);
    if (!fetched) return;

    let index = EMOJIS.POLL_REACTIONS.indexOf(reaction.emoji.name);
    if (index < 0) return;
    if (index === 0) {
      if (fetched.author !== user.id) return;
      this.client.emit('pollClose', reaction.message);
      return;
    }

    const { answers } = fetched;
    index -= 1;

    if (!fetched.multi) {
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
    void polls.update(reaction.message.id, { answers });
  }

}
