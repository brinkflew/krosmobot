import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import { Command } from '@/structures';

/**
 * Does something when the client emits a debugging event.
 */
export default class extends Listener {

  public constructor() {
    super('command-blocked', {
      emitter: 'commands',
      event: 'commandBlocked'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(message: Message, command: Command, reason: string) {
    this.client.logger.warning(`Command ${command.id} blocked for user ${message.author.id}, reason: ${reason}`);
  }

}
