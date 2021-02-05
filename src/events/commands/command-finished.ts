import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import { Command } from '@/structures';

/**
 * Does something when the client emits a debugging event.
 */
export default class extends Listener {

  public constructor() {
    super('command-finished', {
      emitter: 'commands',
      event: 'commandFinished'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(_message: Message, command: Command) {
    this.client.metrics.dec('discord.commands.queued');
    this.client.metrics.update('discord.commands.frequency');
    this.client.logger.verbose(`[COMMAND] Execution completed: ${command.id}`);
  }

}
