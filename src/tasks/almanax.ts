import { TextChannel } from 'discord.js';
import { Task } from '@/structures';
import { dummyMessage } from '@/utils';
import { GuildDocument } from 'types';

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
      const doc = <GuildDocument> this.client.providers.guilds.fetch(guild.id);
      if (!doc?.channels?.almanax) continue;

      const channel = this.client.util.resolveChannel(doc.channels.almanax, guild.channels.cache);
      if (channel?.type !== 'text') continue;

      const message = dummyMessage(this.client, channel as TextChannel);
      command.exec(message, { extended: false, offset: '+1' });
    }
  }

}
