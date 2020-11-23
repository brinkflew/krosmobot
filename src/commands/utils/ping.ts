import { Command } from '@/structures';
import { Message } from 'discord.js';

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
    return message.reply('Pong !');
  }
}
