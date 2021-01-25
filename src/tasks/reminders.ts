import { Task } from '@/structures';
import { TextChannel } from 'discord.js';

/**
 * Send reminders that expired.
 */
export default class RemindersTask extends Task {

  public constructor() {
    super('reminders', { interval: 15 });
  }

  /**
   * Runs the task.
   */
  public async exec() {
    const reminders = await this.client.providers.reminders.model.find({ timestamp: { $lt: Date.now() } });
    if (!reminders.length) return;

    for (const reminder of reminders) {
      const channel = await this.client.channels.fetch(reminder.channel);
      if (channel.type !== 'text' || !(channel instanceof TextChannel)) return;
      const locale = this.client.locales.get(reminder.locale);
      const author = await this.client.users.fetch(reminder.author);
      void channel.send(locale.translate('COMMAND_REMIND_RESPONSE_PROCESSED', reminder.content, author.toString()));
      void this.client.providers.reminders.clear(reminder.id);
    }

    return { sent: `${reminders.length} reminders` };
  }

}
