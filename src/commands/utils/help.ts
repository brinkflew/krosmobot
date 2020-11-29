import { Command } from '@/structures';
import { Message } from 'discord.js';
import { Argument } from 'discord-akairo';
import { DEFAULT_PREFIX } from '@/constants';

/**
 * Display help about the available commands.
 */
export default class HelpCommand extends Command {
  constructor() {
    super('help', {
      aliases: ['h'],
      typing: true,
      description: {
        short: 'COMMAND_HELP_DESCRIPTION_SHORT',
        extended: 'COMMAND_HELP_DESCRIPTION_EXTENDED',
        example: 'COMMAND_HELP_DESCRIPTION_EXAMPLE',
        usage: 'COMMAND_HELP_DESCRIPTION_USAGE'
      },
      args: [
        {
          id: 'command',
          default: null,
          type: Argument.compose('lowercase', 'commandAlias'),
          description: 'COMMAND_HELP_ARGUMENT_COMMAND_DESCRIPTION'
        }
      ]
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, { command }: { command: Command }) {
    try {
      const prefix = message.guild
        ? this.client.settings.guilds.get(message.guild.id, 'prefix', DEFAULT_PREFIX)
        : DEFAULT_PREFIX;

      if (command) {
        const description = command.description;
        const aliases = command.aliases.filter((alias) => alias !== command.id);
        return this.embed(message, {
          title: command.id.toUpperCase(),
          description: this.t(description.extended || description.short || 'COMMAND_HELP_RESPONSE_FIELD_NO_DESCRIPTION', message),
          fields: [
            {
              name: this.t('COMMAND_HELP_RESPONSE_FIELD_TITLE_USAGE', message),
              value: this.t(command.description.usage || 'COMMAND_HELP_RESPONSE_FIELD_NO_USAGE', message, prefix)
            },
            {
              name: this.t('COMMAND_HELP_RESPONSE_FIELD_TITLE_ALIASES', message),
              value: aliases.length
                ? `\`${aliases.join('`, `')}\``
                : this.t('COMMAND_HELP_RESPONSE_FIELD_NO_ALIAS', message)
            },
            {
              name: this.t('COMMAND_HELP_RESPONSE_FIELD_TITLE_EXAMPLE', message),
              value: this.t(description.example || 'COMMAND_HELP_RESPONSE_FIELD_NO_EXAMPLE', message, prefix)
            }
          ],
          footer: {
            text: this.t(`COMMAND_HELP_CATEGORY_${command.category.id.toUpperCase()}`, message)
          }
        });
      }

      const embed = this.craftEmbed(message, {
        title: this.t('COMMAND_HELP_RESPONSE_TITLE', message),
        description: this.t('COMMAND_HELP_DESCRIPTION_EXTENDED', message),
        fields: await this.generateCommandsHelp(message)
      });

      if (message.channel.type != 'dm') {
        this.success(message, this.t('COMMAND_HELP_RESPONSE_DM', message));
        embed.setFooter(this.t('COMMAND_HELP_RESPONSE_FROMGUILD', message, message.guild?.name));
      }

      return message.author.send(embed);
    } catch (error) {
      return this.error(message, this.t('COMMAND_HELP_RESPONSE_ERROR', message));
    }
  }

  /**
   * Generate some help for each available command, broken down per category.
   * @param message Message that triggered the help command
   */
  private async generateCommandsHelp(message: Message) {
    const categories = await this.getCommands(message);
    const fields = [];

    for (const [category, commands] of categories) {
      fields.push({
        name: this.t(`COMMAND_HELP_CATEGORY_${category.toUpperCase()}`, message),
        value: [...commands].map((command) => this.formatCommand(message, command)).join('\n')
      });
    }

    return fields;
  }

  /**
   * Print a command and its description in a human-readable way
   * @param message Message received from Discord
   * @param command The command parsed from arguments
   */
  private formatCommand(message: Message, command: Command): string {
    const prefix = message.guild
      ? this.client.settings.guilds.get(message.guild.id, 'prefix', DEFAULT_PREFIX)
      : DEFAULT_PREFIX;
    const description = this.t(command.description.short || 'COMMAND_HELP_RESPONSE_FIELD_NO_DESCRIPTION', message);
    return `\`${prefix}${command.id}\` → ${description}`;
  }

  /**
   * Filter existing commands based on the guild the command was sent in
   * and the required permissions to execute it.
   * @param message Message from which the command comes
   */
  private async getCommands(message: Message, ids?: string | string[] | null): Promise<Map<string, Set<Command>>> {
    if (typeof ids === 'string') ids = [ids];
    const store = this.client.commands.modules;
    const conditions = async (command: Command) => [
      !command.channel || (command.channel === 'guild' && !!message.guild) || (command.channel === 'dm' && !message.guild),
      !command.ownerOnly || (command.ownerOnly && (this.client.ownerID === message.author.id || this.client.ownerID.includes(message.author.id))),
      await this.client.commands.runPermissionChecks(message, command)
    ];

    const commands = ([...store.values()] as Command[])
      .filter(async (command) => (await conditions(command)).every((condition) => condition));


    const categories: Map<string, Set<Command>> = new Map();

    for (const command of commands) {
      if (!categories.has(command.category.id)) categories.set(command.category.id, new Set());
      const category = categories.get(command.category.id);
      category?.add(command);
    }

    return categories;
  }
}
