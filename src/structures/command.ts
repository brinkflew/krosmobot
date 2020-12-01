import { Command as AkairoCommand, CommandOptions } from 'discord-akairo';
import {
  Guild,
  TextChannel,
  User,
  Message,
  MessageEmbed,
  MessageEmbedOptions,
  GuildMember
} from 'discord.js';
import MongooseProvider from '@/providers/mongoose';
import {
  EMBED_COLOR_GREEN,
  EMBED_COLOR_RED,
  EMBED_COLOR_YELLOW,
  EMBED_COLOR_DEFAULT
} from '@/constants';
import { code } from '@/utils/message';

/**
 * Represents a command.
 */
export class Command extends AkairoCommand {
  constructor(id: string, options: CommandOptions = {}) {
    if (!options.aliases) options.aliases = [];
    if (!options.aliases.includes(id)) options.aliases.push(id);
    super(id, options);
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

  /**
   * Sends a simple embed containing a success message.
   * @param message Message that triggered this command
   * @param description Text to send in the success embed
   */
  public async success(message: Message, description: string): Promise<Message> {
    this.handler.emit('command-success', this, message);
    const embed = new MessageEmbed({ color: EMBED_COLOR_GREEN, description });
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
    if (error instanceof Error) error = error.toString();
    if (typeof error === 'string') description = `${description} ${code(error)}`;
    const embed = new MessageEmbed({ color: EMBED_COLOR_RED, description });
    return this.sendUtil(message, embed);
  }

  /**
   * Sends a simple embed containing a warning message.
   * @param message Message that triggered this command
   * @param description Text to send in the warning embed
   */
  public async warning(message: Message, description: string): Promise<Message> {
    this.handler.emit('command-warning', this, message);
    const embed = new MessageEmbed({ color: EMBED_COLOR_YELLOW, description });
    return this.sendUtil(message, embed);
  }

  /**
   * Crafts an embed (does not send it), automatically filling in the border color if necessary.
   * @param message Message that triggered this command
   * @param content Embed to send over
   */
  public craftEmbed(message: Message, content: MessageEmbedOptions | MessageEmbed): MessageEmbed {
    if (!(content instanceof MessageEmbed)) content = new MessageEmbed(content);
    const color = message.guild
      ? this.client.settings.guilds.get(message.guild.id, 'color', EMBED_COLOR_DEFAULT)
      : this.client.settings.users.get(message.author.id, 'color', EMBED_COLOR_DEFAULT);
    if (!content.color) content.setColor(color);
    return content;
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
   * Gets the correct provider depending on the type of the object for
   * which data will be fetched or modified.
   * @param holder Instance to find the correct provider for
   */
  private getProvider(holder: Guild | TextChannel | User | GuildMember): MongooseProvider {
    let settings = this.client.settings;
    if (holder instanceof Guild) return settings.guilds;
    if (holder instanceof TextChannel) return settings.channels;
    if (holder instanceof GuildMember) return settings.members;
    /* if (holder instanceof User) */ return settings.users;
  }

  /**
   * Stores a value in the datastore.
   * @param guild Guild for which data needs to be updated
   * @param key Key to update
   * @param value Value to set
   */
  public async set(holder: Guild | TextChannel | User | GuildMember, key: string, value: any): Promise<any> {
    const settings = this.getProvider(holder);
    return settings.set(holder.id, key, value);
  }

  /**
   * Fetches a value from the datastore.
   * @param guild Guild for which data needs to be updated
   * @param key Key to update
   * @param defaultValue Default value if none is find
   */
  public get(holder: Guild | TextChannel | User | GuildMember, key: string, defaultValue: any): any {
    const settings = this.getProvider(holder);
    return settings.get(holder.id, key, defaultValue);
  }

  /**
   * Removes a value from the datastore.
   * @param guild Guild from which data needs to be removed
   * @param key Key to remove
   */
  public async delete(holder: Guild | TextChannel | User | GuildMember, key: string) {
    const settings = this.getProvider(holder);
    return settings.delete(holder.id, key);
  }

  /**
   * Fetches the correct translation for this message.
   * @param key Key for the translation to fetch
   * @param message Message which triggered the command
   * @param args Parameters to pass to the translation
   */
  public translate(key: string, message: Message, ...args: any[]): string {
    const settings = message.guild || message.author;
    const language = <string> this.get(settings, 'locale', process.env.KROSMOBOT_DEFAULT_LANGUAGE || 'en');
    const locale = this.client.locales.get(language);
    return locale.translate(key, ...args);
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
}
