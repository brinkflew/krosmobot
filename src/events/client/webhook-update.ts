import { Listener } from 'discord-akairo';
import { TextChannel } from 'discord.js';
import { Logger } from '@/structures';

/**
 * Emitted whenever a guild text channel has its webhooks changed.
 */
export default class extends Listener {

  public constructor() {
    super('client-webhook-update', {
      emitter: 'client',
      event: 'webhookUpdate'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(channel: TextChannel) {
    this.client.logger.debug(Logger.format(
      'discord',
      'webhook-update',
      { guild: channel.guild.id, channel: channel.id }
    ));
  }

}
