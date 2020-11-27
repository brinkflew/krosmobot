import { Command } from '@/structures';
import { Message } from 'discord.js';
import { DEFAULT_PREFIX } from '@/constants';

/**
 * Change the bot prefix for the current guild.
 */
export default class PrefixCommand extends Command {
  constructor() {
    super('prefix', {
      channel: 'guild',
      userPermissions: ['MANAGE_GUILD'],
      args: [{ id: 'prefix', type: 'string' }]
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, { prefix }: any): Promise<Message> {
    try {
      const defaultPrefix = process.env.KROSMOBOT_PREFIX || DEFAULT_PREFIX;

     // Reset the default prefix
      if (!prefix) {
        await this.set(message.guild!, 'prefix', defaultPrefix);
        return this.success(message, this.t('COMMAND_PREFIX_RESPONSE_RESET', message, defaultPrefix));
      }

      // Check if the prefix actually changes
      let oldPrefix = this.get(message.guild!, 'prefix', defaultPrefix);
      if (oldPrefix === prefix)
        return this.warning(message, this.t('COMMAND_PREFIX_RESPONSE_IDENTICAL', message));

      // Save the new prefix
      await this.set(message.guild!, 'prefix', prefix);
      return this.success(message, this.t('COMMAND_PREFIX_RESPONSE_MODIFIED', message, prefix));
    } catch (error) {
      return this.error(message, this.t('COMMAND_PREFIX_RESPONSE_ERROR', message));
    }
  }
}
