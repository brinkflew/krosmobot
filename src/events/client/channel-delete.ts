import { Listener } from 'discord-akairo';
import { DMChannel, GuildChannel } from 'discord.js';
import { Logger } from '@/structures';

/**
 * Does something when the client deletes a channel.
 */
export default class extends Listener {

  public constructor() {
    super('client-channel-delete', {
      emitter: 'client',
      event: 'channelDelete'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(channel: DMChannel | GuildChannel) {
    this.client.logger.verbose(Logger.format(
      'discord',
      'channel-deleted',
      { channel: channel.id }
    ));
  }

}
