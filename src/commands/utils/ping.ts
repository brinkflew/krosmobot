import { Command } from '@/structures';
import { Message } from 'discord.js';
import { EMBEDS } from '@/constants';

/**
 * Get the latency between the user and the client,
 * and between the client and the Discord servers
 */
export default class PingCommand extends Command {

  public constructor() {
    super('ping', {
      description: {
        'short': 'COMMAND_PING_DESCRIPTION_SHORT',
        'extended': 'COMMAND_PING_DESCRIPTION_EXTENDED',
        'example': 'COMMAND_PING_DESCRIPTION_EXAMPLE'
      }
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message) {
    const embed = { title: this.t('COMMAND_PING_RESPONSE_TITLE', message) };
    const sent = await this.embed(message, embed);

    const diff = (sent.editedTimestamp || sent.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp);
    const ping = Math.round(this.client.ws.ping);

    return this.embed(message, {
      ...embed,
      fields: [
        { name: this.t('COMMAND_PING_RESPONSE_RTT', message), value: `${diff} ms`, inline: true },
        EMBEDS.SEPARATORS.INLINE,
        { name: this.t('COMMAND_PING_RESPONSE_HEARTBEAT', message), value: `${ping} ms`, inline: true }
      ]
    });
  }

}
