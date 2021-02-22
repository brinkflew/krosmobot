import { Command } from '@/structures';
import { Message } from 'discord.js';
import { Argument } from 'discord-akairo';
import { code } from '@/utils/message';

/**
 * Display help about the available commands.
 */
export default class HelpCommand extends Command {

  public constructor() {
    super('help', {
      aliases: ['h'],
      typing: true,
      description: {
        'short': 'COMMAND_HELP_DESCRIPTION_SHORT',
        'extended': 'COMMAND_HELP_DESCRIPTION_EXTENDED',
        'example': 'COMMAND_HELP_DESCRIPTION_EXAMPLE'
      },
      args: [
        {
          'id': 'command',
          'default': null,
          'type': Argument.compose('lowercase', 'commandAlias'),
          'description': 'COMMAND_HELP_DESCRIPTION_ARGUMENT_COMMAND'
        }
      ]
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, { command }: { command: Command | null }) {
    const prefix = this.getPrefix(message);

    if (command) {
      const { description } = command;
      const aliases = command.aliases.filter(alias => alias !== command.id);
      return this.embed(message, {
        title: command.id.toUpperCase(),
        description: message.t(description.extended || description.short || 'COMMAND_HELP_RESPONSE_FIELD_NO_DESCRIPTION'),
        fields: [
          {
            name: message.t('COMMAND_HELP_RESPONSE_FIELD_TITLE_USAGE'),
            value: `${code(command.usage(message))}\n${command.formatArgs(message)}`
          },
          {
            name: message.t('COMMAND_HELP_RESPONSE_FIELD_TITLE_ALIASES'),
            value: aliases.length
              ? `\`${aliases.join('`, `')}\``
              : message.t('COMMAND_HELP_RESPONSE_FIELD_NO_ALIAS')
          },
          {
            name: message.t('COMMAND_HELP_RESPONSE_FIELD_TITLE_EXAMPLE'),
            value: message.t(description.example || 'COMMAND_HELP_RESPONSE_FIELD_NO_EXAMPLE', prefix)
          }
        ],
        footer: {
          text: message.t(`COMMAND_HELP_CATEGORY_${command.category.id.toUpperCase()}`)
        }
      });
    }

    const embed = this.craftEmbed(message, {
      title: message.t('COMMAND_HELP_RESPONSE_TITLE'),
      description: message.t('COMMAND_HELP_DESCRIPTION_EXTENDED'),
      fields: this.generateCommandsHelp(message)
    });

    if (message.channel.type !== 'dm') {
      void this.success(message, message.t('COMMAND_HELP_RESPONSE_DM'));
      embed.setFooter(message.t('COMMAND_HELP_RESPONSE_FROMGUILD', message.guild?.name));
    }

    return message.author.send(embed);
  }

  /**
   * Generate some help for each available command, broken down per category.
   * @param message Message that triggered the help command
   */
  private generateCommandsHelp(message: Message) {
    const categories = this.getCommands(message);
    const fields = [];

    for (const [category, commands] of categories) {
      fields.push({
        name: message.t(`COMMAND_HELP_CATEGORY_${category.toUpperCase()}`),
        value: [...commands].map(command => this.formatCommand(message, command)).join('\n')
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
    const prefix = this.getPrefix(message);
    const description = message.t(command.description.short || 'COMMAND_HELP_RESPONSE_FIELD_NO_DESCRIPTION');
    return `\`${prefix}${command.id}\` → ${description}`;
  }

  /**
   * Filter existing commands based on the guild the command was sent in
   * and the required permissions to execute it.
   * @param message Message from which the command comes
   */
  private getCommands(message: Message, ids?: string | string[] | null): Map<string, Set<Command>> {
    if (typeof ids === 'string') ids = [ids];
    const store = this.client.commands.modules;

    const conditions = (command: Command) => [
      !command.channel || (command.channel === 'guild' && Boolean(message.guild)) || (command.channel === 'dm' && !message.guild),
      !command.ownerOnly || (command.ownerOnly && (this.client.ownerID === message.author.id || this.client.ownerID.includes(message.author.id)))
    ];

    const commands = ([...store.values()] as Command[])
      .filter(command => (conditions(command)).every(condition => condition));


    const categories: Map<string, Set<Command>> = new Map();

    for (const command of commands) {
      if (!categories.has(command.category.id)) categories.set(command.category.id, new Set());
      const category = categories.get(command.category.id);
      category?.add(command);
    }

    return categories;
  }

}
