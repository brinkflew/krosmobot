import { Command } from '@/structures';
import { Message } from 'discord.js';
import { DEFAULT_PREFIX } from '@/constants';

/**
 * Change the bot prefix for the current guild.
 */
export default class PrefixCommand extends Command {

  public constructor() {
    super('prefix', {
      channel: 'guild',
      userPermissions: ['MANAGE_GUILD'],
      args: [{ id: 'prefix', type: 'string' }],
      description: {
        'short': 'COMMAND_PREFIX_DESCRIPTION_SHORT',
        'extended': 'COMMAND_PREFIX_DESCRIPTION_EXTENDED',
        'example': 'COMMAND_PREFIX_DESCRIPTION_EXAMPLE',
        'usage': 'COMMAND_PREFIX_DESCRIPTION_USAGE'
      }
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
        await this.set(message.guild!, 'settings', { prefix: defaultPrefix });
        return this.success(message, this.t('COMMAND_PREFIX_RESPONSE_RESET', message, defaultPrefix));
      }

      // Check if the prefix actually changes
      const settings = this.get(message.guild!, 'settings', { prefix: defaultPrefix });
      if (settings.prefix === prefix) {
        return this.warning(message, this.t('COMMAND_PREFIX_RESPONSE_IDENTICAL', message));
      }

      // Save the new prefix
      await this.set(message.guild!, 'settings', { prefix });
      return this.success(message, this.t('COMMAND_PREFIX_RESPONSE_MODIFIED', message, prefix));
    } catch (error) {
      return this.error(message, this.t('COMMAND_PREFIX_RESPONSE_ERROR', message));
    }
  }

}
