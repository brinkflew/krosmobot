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
      const config = this.client.settings.guilds.get(guild.id, 'almanax', {});
      if (!config.auto || !config.channel) continue;

      const channel = this.client.util.resolveChannel(config.channel, guild.channels.cache);
      if (!(channel instanceof TextChannel)) continue;

      const message = dummyMessage(this.client, channel);
      command.exec(message, { extended: false, target: '+1' });
    }
  }

}
