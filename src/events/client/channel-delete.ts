import { Listener } from 'discord-akairo';
import { DMChannel, GuildChannel } from 'discord.js';

/**
 * Does something when the client deletes a channel.
 */
export default class extends Listener {
  constructor() {
    super('client-channel-delete', {
      emitter: 'client',
      event: 'channelDelete'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(channel: DMChannel | GuildChannel) {
    this.client.logger.verbose(`Deleted ${channel.type} channel: ${channel}`);
  }
}
