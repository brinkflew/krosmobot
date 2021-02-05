import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import { Logger } from '@/structures';

/**
 * Emitted whenever a message is created.
 */
export default class extends Listener {

  public constructor() {
    super('client-message', {
      emitter: 'client',
      event: 'message'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(message: Message) {
    const params: { [key: string]: string } = {};
    if (message.author.id === this.client.user?.id) params.to = message.channel.id;
    else params.from = message.author.id;

    this.client.logger.verbose(Logger.format(
      'discord',
      `message-${message.author.id === this.client.user?.id ? 'sent' : 'received'}`,
      params
    ));
  }

}
