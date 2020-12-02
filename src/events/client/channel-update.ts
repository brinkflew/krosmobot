import { Listener } from 'discord-akairo';
import { DMChannel, GuildChannel } from 'discord.js';

/**
 * Does something when the client updates a channel.
 */
export default class extends Listener {

  public constructor() {
    super('client-channel-update', {
      emitter: 'client',
      event: 'channelUpdate'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(oldChannel: DMChannel | GuildChannel, newChannel: DMChannel | GuildChannel) {
    this.client.logger.verbose(`Updated ${oldChannel.type} channel: ${oldChannel.id} -> ${newChannel.id}`);
  }

}
