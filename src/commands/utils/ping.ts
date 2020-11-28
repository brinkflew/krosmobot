import { Command } from '@/structures';
import { Message } from 'discord.js';
import { INLINE_SEPARATOR } from '@/constants';

/**
 * Get the latency between the user and the client,
 * and between the client and the Discord servers
 */
export default class PingCommand extends Command {
  constructor() {
    super('ping', {
      description: {
        short: 'COMMAND_PING_DESCRIPTION_SHORT',
        extended: 'COMMAND_PING_DESCRIPTION_EXTENDED',
        example: 'COMMAND_PING_DESCRIPTION_EXAMPLE',
        usage: 'COMMAND_PING_DESCRIPTION_USAGE'
      },
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message) {
    const embed = { title: this.t('COMMAND_PING_RESPONSE_TITLE', message) };
    const sent = await this.embed(message, embed);
    
    const diff = (sent.editedAt || sent.createdAt).getTime() - (message.editedAt || message.createdAt).getTime();
    const ping = Math.round(this.client.ws.ping);

    return this.embed(message, {
      ...embed,
      fields: [
        { name: this.t('COMMAND_PING_RESPONSE_RTT', message), value: `${diff} ms`, inline: true },
        INLINE_SEPARATOR,
        { name: this.t('COMMAND_PING_RESPONSE_HEARTBEAT', message), value: `${ping} ms`, inline: true }
      ]
    });
  }
}
