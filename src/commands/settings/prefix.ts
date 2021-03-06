import { Command } from '@/structures';
import { Message } from 'discord.js';
import { DEFAULTS } from '@/constants';

/**
 * Change the bot prefix for the current guild.
 */
export default class PrefixCommand extends Command {

  public constructor() {
    super('prefix', {
      userPermissions: ['MANAGE_GUILD'],
      description: {
        'short': 'COMMAND_PREFIX_DESCRIPTION_SHORT',
        'extended': 'COMMAND_PREFIX_DESCRIPTION_EXTENDED',
        'example': 'COMMAND_PREFIX_DESCRIPTION_EXAMPLE'
      },
      args: [
        {
          id: 'prefix',
          type: 'string',
          description: 'COMMAND_PREFIX_DESCRIPTION_ARGUMENT_PREFIX'
        }
      ]
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, args: { [key: string]: string | null }): Promise<Message> {
    const provider = this.getProvider(message);
    const id = this.getID(message);

    // Reset the default prefix
    if (!args.prefix) {
      await provider.update(id, { settings: { prefix: DEFAULTS.PREFIX } });
      return this.success(message, message.t('COMMAND_PREFIX_RESPONSE_RESET', DEFAULTS.PREFIX));
    }

    // Check if the prefix actually changes
    const settings = provider.fetch(id)?.settings;
    if (settings?.prefix === args.prefix) return this.warning(message, message.t('COMMAND_PREFIX_RESPONSE_IDENTICAL'));

    // Save the new prefix
    await provider.update(id, { settings: { prefix: args.prefix } });
    return this.success(message, message.t('COMMAND_PREFIX_RESPONSE_MODIFIED', args.prefix));
  }

}
