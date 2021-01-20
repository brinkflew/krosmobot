import { Listener } from 'discord-akairo';
import { DMChannel, GuildChannel } from 'discord.js';
import metrics from '@/metrics';
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
    const { channels } = metrics.discord;
    channels.set(channels.val() - 1);
    this.client.logger.verbose(Logger.format(
      'discord',
      'channel-deleted',
      { channel: channel.id }
    ));
  }

}
