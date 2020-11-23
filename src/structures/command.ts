import { Command as AkairoCommand, CommandOptions } from 'discord-akairo';

/**
 * Represents a command.
 */
export class Command extends AkairoCommand {
  constructor(id: string, options: CommandOptions = {}) {
    if (!options.aliases) options.aliases = [];
    if (!options.aliases.includes(id)) options.aliases.push(id);
    super(id, options);
  }
}
