import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import { Command } from '@/structures';

/**
 * Does something when the client emits a debugging event.
 */
export default class extends Listener {

  public constructor() {
    super('command-started', {
      emitter: 'commands',
      event: 'commandStarted'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(_message: Message, command: Command) {
    this.client.metrics.inc('discord.commands.queued');
    this.client.logger.verbose(`[COMMAND] Execution started: ${command.id}`);
  }

}
