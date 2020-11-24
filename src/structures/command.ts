import { Command as AkairoCommand, CommandOptions } from 'discord-akairo';
import {
  Guild,
  Message,
  MessageEmbed,
  MessageEmbedOptions
} from 'discord.js';
import { GREEN, RED, YELLOW, DEFAULT } from '@/constants/colors';
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
    const embed = new MessageEmbed({ color: GREEN, description });
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
    const embed = new MessageEmbed({ color: RED, description });
    return this.sendUtil(message, embed);
  }

  /**
   * Sends a simple embed containing a warning message.
   * @param message Message that triggered this command
   * @param description Text to send in the warning embed
   */
  public async warning(message: Message, description: string): Promise<Message> {
    this.handler.emit('command-warning', this, message);
    const embed = new MessageEmbed({ color: YELLOW, description });
    return this.sendUtil(message, embed);
  }

  /**
   * Sends an embed, automatically filling in the border color if necessary.
   * @param message Message that triggered this command
   * @param content Embed to send over
   */
  public async embed(message: Message, content: MessageEmbedOptions | MessageEmbed): Promise<Message> {
    if (!(content instanceof MessageEmbed)) content = new MessageEmbed(content);
    if (!content.color) content.setColor(DEFAULT);
    return this.sendUtil(message, content);
  }

  /**
   * Stores a value in the datastore.
   * @param guild Guild for which data needs to be updated
   * @param key Key to update
   * @param value Value to set
   */
  public async set(guild: Guild, key: string, value: any): Promise<any> {
    const settings = this.client.settings;
    if (guild instanceof Guild) return settings.guilds.set(guild.id, key, value);
  }

  /**
   * Fetches a value from the datastore.
   * @param guild Guild for which data needs to be updated
   * @param key Key to update
   * @param defaultValue Default value if none is find
   */
  public async get(guild: Guild, key: string, defaultValue: any) {
    const settings = this.client.settings;
    if (guild instanceof Guild) return settings.guilds.get(guild.id, key, defaultValue);
  }

  /**
   * Removes a value from the datastore.
   * @param guild Guild from which data needs to be removed
   * @param key Key to remove
   */
  public async delete(guild: Guild, key: string) {
    const settings = this.client.settings;
    if (guild instanceof Guild) return settings.guilds.delete(guild.id, key);
  }
}
