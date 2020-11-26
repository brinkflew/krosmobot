import { Listener } from 'discord-akairo';
import { DMChannel, GuildChannel } from 'discord.js';

/**
 * Does something when the client pins or un-pins a message
 * in a channel.
 */
export default class extends Listener {
  constructor() {
    super('client-channel-pins-update', {
      emitter: 'client',
      event: 'channelPinsUpdate'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(channel: DMChannel | GuildChannel, _date: Date) {
    this.client.logger.verbose(`Pinned message in ${channel.type} channel: ${channel}`);
  }
}
