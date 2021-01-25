import { Task } from '@/structures';
import { TextChannel } from 'discord.js';

/**
 * Close polls that reached their automatic-closing date.
 */
export default class PollsTask extends Task {

  public constructor() {
    super('polls', { interval: 15 });
  }

  /**
   * Runs the task.
   */
  public async exec() {
    const polls = await this.client.providers.polls.model.find({ timestamp: { $lt: Date.now() } });
    if (!polls.length) return;

    for (const poll of polls) {
      const channel = await this.client.channels.fetch(poll.channel);
      if (channel.type !== 'text' || !(channel instanceof TextChannel)) return;
      const message = await channel.messages.fetch(poll.id);
      this.client.emit('pollClose', message);
    }

    return { closed: `${polls.length} polls` };
  }

}
