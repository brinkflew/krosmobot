import { Listener } from 'discord-akairo';
import { DMChannel, GuildChannel } from 'discord.js';
import { Logger } from '@/structures';

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
    this.client.metrics.inc('discord.channels');
    this.client.logger.verbose(Logger.format(
      'discord',
      'channel-deleted',
      { channel: channel.id }
    ));
  }

}
