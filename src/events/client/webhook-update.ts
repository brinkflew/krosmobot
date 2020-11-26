import { Listener } from 'discord-akairo';
import { TextChannel } from 'discord.js';

/**
 * Emitted whenever a guild text channel has its webhooks changed.
 */
export default class extends Listener {
  constructor() {
    super('client-webhook-update', {
      emitter: 'client',
      event: 'webhookUpdate'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(channel: TextChannel) {
    this.client.logger.debug(`Webhook updated for channel ${channel} in guild ${channel.guild}`);
  }
}
