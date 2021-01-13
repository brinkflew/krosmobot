import { TextChannel } from 'discord.js';
import { Task } from '@/structures';
import { dummyMessage } from '@/utils';

/**
 * Sends the almanax every day at midnight.
 */
export default class AlmanaxTask extends Task {

  public constructor() {
    super('almanax', { at: '23:00' });
  }

  /**
   * Runs the task.
   */
  public exec() {
    const command = this.client.commands.findCommand('almanax');

    for (const guild of this.client.guilds.cache.array()) {
      const config = this.client.providers.guilds.get(guild.id, 'settings', {});
      if (!config.tasks?.almanax || !config.channels?.almanax) continue;

      const channel = this.client.util.resolveChannel(config.channels.almanax, guild.channels.cache);
      if (!(channel instanceof TextChannel)) continue;

      const message = dummyMessage(this.client, channel);
      command.exec(message, { extended: false, target: '+1' });
    }
  }

}
