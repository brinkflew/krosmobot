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
  EMBED_COLOR_DEFAULT,
  DEFAULT_PREFIX
} from '@/constants';
import { code } from '@/utils/message';

/**
 * Represents a command.
 */
export class Command extends AkairoCommand {

  public constructor(id: string, options: CommandOptions = {}) {
    if (!options.aliases) options.aliases = [];
    if (!options.aliases.includes(id)) options.aliases.push(id);
    super(id, options);
  }

  /**
   * Sends a simple embed containing a success message.
   * @param message Message that triggered this command
   * @param description Text to send in the success embed
   */
  public async success(message: Message, description: string): Promise<Message> {
    this.handler.emit('command-success', this, message);
    const embed = new MessageEmbed({
      color: EMBED_COLOR_GREEN,
      author: { name: this.t('MESSAGE_STATUS_SUCCESS', message) },
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
      color: EMBED_COLOR_RED,
      author: { name: this.t('MESSAGE_STATUS_ERROR', message) },
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
      color: EMBED_COLOR_YELLOW,
      author: { name: this.t('MESSAGE_STATUS_WARNING', message) },
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
    const color = message.guild
      ? this.client.providers.guilds.get(message.guild.id, 'color', EMBED_COLOR_DEFAULT)
      : this.client.providers.users.get(message.author.id, 'color', EMBED_COLOR_DEFAULT);
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
   * Stores a value in the datastore.
   * @param guild Guild for which data needs to be updated
   * @param key Key to update
   * @param value Value to set
   */
  public async set(holder: Guild | TextChannel | User | GuildMember, key: string, value: any): Promise<any> {
    const settings = this.getProvider(holder);
    return settings.set(this.getID(holder), key, value);
  }

  /**
   * Fetches a value from the datastore.
   * @param guild Guild for which data needs to be updated
   * @param key Key to update
   * @param defaultValue Default value if none is find
   */
  public get(holder: Guild | TextChannel | User | GuildMember, key: string, defaultValue: any): any {
    const settings = this.getProvider(holder);
    return settings.get(this.getID(holder), key, defaultValue);
  }

  /**
   * Removes a value from the datastore.
   * @param guild Guild from which data needs to be removed
   * @param key Key to remove
   */
  public async delete(holder: Guild | TextChannel | User | GuildMember, key: string) {
    const settings = this.getProvider(holder);
    return settings.delete(this.getID(holder), key);
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

  /**
   * Finds the prefix currnetly in use for this command.
   * @param message Message that triggered the command
   */
  public getPrefix(message?: Message): string {
    if (!message?.guild) return DEFAULT_PREFIX;
    return this.client.providers.guilds.get(message.guild.id, 'prefix', DEFAULT_PREFIX);
  }

  /**
   * Gets the correct provider depending on the type of the object for
   * which data will be fetched or modified.
   * @param holder Instance to find the correct provider for
   */
  private getProvider(holder: Guild | TextChannel | User | GuildMember): MongooseProvider {
    const { providers } = this.client;
    if (holder instanceof Guild) return providers.guilds;
    if (holder instanceof TextChannel) return providers.channels;
    if (holder instanceof GuildMember) return providers.members;
    /* if (holder instanceof User) */ return providers.users;
  }

  /**
   * Gets the correct ID depending on the type of the object for
   * which data will be fetched or modified.
   * @param holder Instance to find the correct ID for
   */
  private getID(holder: Guild | TextChannel | User | GuildMember): string {
    if (holder instanceof GuildMember) return `${holder.guild.id}:${holder.id}`;
    return holder.id;
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
