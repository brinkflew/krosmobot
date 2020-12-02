import { Listener } from 'discord-akairo';
import { DMChannel, GuildChannel } from 'discord.js';

/**
 * Does something when the client creates a channel.
 */
export default class extends Listener {

  public constructor() {
    super('client-channel-create', {
      emitter: 'client',
      event: 'channelCreate'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(channel: DMChannel | GuildChannel) {
    this.client.logger.verbose(`Created ${channel.type} channel: ${channel.id}`);
  }

}
