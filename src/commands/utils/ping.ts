import { Command } from '@/structures';
import { Message } from 'discord.js';
import { SEPARATORS } from '@/constants/embed';

/**
 * Get the latency between the user and the client,
 * and between the client and the Discord servers
 */
export default class PingCommand extends Command {
  constructor() {
    super('ping', {});
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message) {
    const embed = { title: 'Pong !' };
    const sent = await this.embed(message, embed);

    const diff = (sent.editedAt || sent.createdAt).getTime() - (message.editedAt || message.createdAt).getTime();
    const ping = Math.round(this.client.ws.ping);

    return this.embed(message, {
      ...embed,
      fields: [
        { name: 'Round-Trip Time', value: `${diff} ms`, inline: true },
        SEPARATORS.HORIZONTAL,
        { name: 'Heartbeat', value: `${ping} ms`, inline: true }
      ]
    });
  }
}
