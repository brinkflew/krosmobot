import { Command as AkairoCommand, CommandOptions } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { GREEN, RED, YELLOW, DEFAULT } from '@/constants/colors';
import { code } from '@/utils/message';
import { MessageEmbedOptions } from 'discord.js';

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
}
