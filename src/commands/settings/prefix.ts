import { Command } from '@/structures';
import { Message } from 'discord.js';

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
      const defaultPrefix = process.env.KROSMOBOT_PREFIX || '!';

     // Reset the default prefix
      if (!prefix) {
        await this.set(message.guild!, 'prefix', defaultPrefix);
        return this.success(message, `Prefix reset to ${defaultPrefix}`);
      }

      // Check if the prefix actually changes
      let oldPrefix = await this.get(message.guild!, 'prefix', defaultPrefix);
      if (oldPrefix === prefix) return this.warning(message, `Identical prefix`);

      // Save the new prefix
      await this.set(message.guild!, 'prefix', prefix);
      return this.success(message, `Prefix changed to ${prefix}`);
    } catch (error) {
      return this.error(message, `Couldn't set prefix`, error);
    }
  }
}
