import {
  Command as AkairoCommand,
  CommandOptions,
  ArgumentOptions
} from 'discord-akairo';
import {
  Message,
  MessageEmbed,
  MessageEmbedOptions
} from 'discord.js';
import { Locale } from '@/structures';
import { EMBEDS, DEFAULTS } from '@/constants';
import { code } from '@/utils/message';

/**
 * Represents a command.
 */
export class Command extends AkairoCommand {

  public argumentsUsage: ArgumentOptions[];

  public constructor(id: string, options: CommandOptions = {}) {
    if (!options.aliases) options.aliases = [];
    if (!options.aliases.includes(id)) options.aliases.push(id);

    super(id, options);

    this.argumentsUsage = options.usage || (Array.isArray(options.args) ? options.args : []);
  }

  /**
   * Sends a simple embed containing a success message.
   * @param message Message that triggered this command
   * @param description Text to send in the success embed
   */
  public async success(message: Message, description: string): Promise<Message> {
    this.handler.emit('command-success', this, message);
    const embed = new MessageEmbed({
      color: EMBEDS.COLORS.GREEN,
      author: { name: message.t('MESSAGE_STATUS_SUCCESS') },
      description
    });
    return this.sendUtil(message, embed);
  }

  /**
   * Sends a simple embed containing an error message.
   * @param message Message that triggered this command
   * @param description Text to send in the error embed
   * @param error Optional error description to send along
   */
  public async error(message: Message, description: string, error?: Error | string): Promise<Message> {
    this.handler.emit('command-error', this, message, error);
    if (error instanceof Error) error = error.message;
    if (typeof error === 'string') description = `${description} ${code(error)}`;
    const embed = new MessageEmbed({
      color: EMBEDS.COLORS.RED,
      author: { name: message.t('MESSAGE_STATUS_ERROR') },
      description
    });
    return this.sendUtil(message, embed);
  }

  /**
   * Sends a simple embed containing a warning message.
   * @param message Message that triggered this command
   * @param description Text to send in the warning embed
   */
  public async warning(message: Message, description: string): Promise<Message> {
    this.handler.emit('command-warning', this, message);
    const embed = new MessageEmbed({
      color: EMBEDS.COLORS.YELLOW,
      author: { name: message.t('MESSAGE_STATUS_WARNING') },
      description
    });
    return this.sendUtil(message, embed);
  }

  /**
   * Crafts an embed (does not send it), automatically filling in the border color if necessary.
   * @param message Message that triggered this command
   * @param content Embed to send over
   */
  public craftEmbed(message: Message, content: MessageEmbedOptions | MessageEmbed): MessageEmbed {
    if (!(content instanceof MessageEmbed)) content = new MessageEmbed(content);
    if (content.color) return content;
    const color = this.getDocument(message)?.settings?.color || EMBEDS.COLORS.DEFAULT;
    return content.setColor(color);
  }

  /**
   * Sends an embed, automatically filling in the border color if necessary.
   * @param message Message that triggered this command
   * @param content Embed to send over
   */
  public async embed(message: Message, content: MessageEmbedOptions | MessageEmbed): Promise<Message> {
    return this.sendUtil(message, this.craftEmbed(message, content));
  }

  /**
   * Fetches the correct translation for this message.
   * @param key Key for the translation to fetch
   * @param message Message which triggered the command
   * @param args Parameters to pass to the translation
   */
  public translate(key: string, message: Message, ...args: any[]): string {
    return this
      .getLocale(message)
      .translate(key, ...args);
  }

  /**
   * Fetches the correct translation for this message.
   * This is a shortand for `Command#translate()`.
   * @param key Key for the translation to fetch
   * @param message Message which triggered the command
   * @param args Parameters to pass to the translation
   */
  public t(key: string, message: Message, ...args: any[]): string {
    return this.translate(key, message, ...args);
  }

  /**
   * Finds the prefix currnetly in use for this command.
   * @param message Message that triggered the command
   */
  public getPrefix(message?: Message): string {
    if (!message?.guild) return DEFAULTS.PREFIX;
    return this.getDocument(message)?.settings?.prefix || DEFAULTS.PREFIX;
  }

  /**
   * Gets the correct provider depending on the type of the object for
   * which data will be fetched or modified.
   * @param message Message to find the provider for
   */
  public getProvider(message: Message) {
    return message.guild
      ? this.client.providers.guilds
      : this.client.providers.users;
  }

  /**
   * Gets the correct ID depending on the type of the object for
   * which data will be fetched or modified.
   * @param message Message to find the ID for
   */
  public getID(message: Message): string {
    return message.guild ? message.guild.id : message.author.id;
  }

  /**
   * Finds the document to save to and fetch from based on the message that triggered the command.
   * @param message Message to find the document for
   */
  public getDocument(message: Message) {
    return this.getProvider(message).fetch(this.getID(message));
  }

  /**
   * Finds the correct locale for the given message
   * @param message Message to find the current locale for
   */
  public getLocale(message: Message): Locale {
    const language = this.getDocument(message)?.settings?.locale || DEFAULTS.LOCALE;
    return this.client.locales.get(language);
  }

  public usage(message: Message) {
    const args: string[] = [];

    for (const arg of this.argumentsUsage) {
      if (arg.match === 'none') continue;
      const required = arg.required && !arg.default && !arg.prompt;
      const flag = Array.isArray(arg.flag) ? arg.flag[0] : arg.flag;
      const usage = flag ? (arg.match === 'option' ? `${flag} <${arg.id!}>` : flag) : arg.id!;
      args.push(required ? `<${usage}>` : `[${usage}]`);
    }

    return `${this.getPrefix(message)}${this.id} ${args.join(' ')}`;
  }

  public formatArgs(message: Message) {
    const args: string[] = [];

    for (const arg of this.argumentsUsage) {
      const required = arg.required && !arg.default && !arg.prompt;
      const flag = Array.isArray(arg.flag) ? arg.flag[0] : arg.flag;
      const usage = flag ? (arg.match === 'option' ? `${flag} <${arg.id!}>` : flag) : arg.id!;
      const description = this.t(typeof arg.description === 'string' ? arg.description : 'ARGUMENT_NO_DESCRIPTION', message);
      const argument = `\`${usage}\` → ${description}${required ? ` (${message.t('ARGUMENT_OPTIONAL')})` : ''}`;
      args.push(argument);
    }

    return args.join('\n');
  }

  /**
   * Sends a message using CommandUtil if enabled, or fallbacks
   * to sending a new message to the original channel.
   * @param message Message that triggered this command
   * @param content Content to send over
   */
  private async sendUtil(message: Message, content: any): Promise<Message> {
    if (message.util) return message.util.send(content);
    return message.channel.send(content);
  }

}
