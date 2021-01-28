import { Argument } from 'discord-akairo';
import { Message } from 'discord.js';
import { Command } from '@/structures';
import { EMBED_COLOR_DEFAULT } from '@/constants';

/**
 * Change the color used in embed borders for the current guild.
 */
export default class ColorCommand extends Command {

  public constructor() {
    super('color', {
      aliases: ['colour'],
      userPermissions: ['MANAGE_GUILD'],
      description: {
        'short': 'COMMAND_COLOR_DESCRIPTION_SHORT',
        'extended': 'COMMAND_COLOR_DESCRIPTION_EXTENDED',
        'example': 'COMMAND_COLOR_DESCRIPTION_EXAMPLE',
        'usage': 'COMMAND_COLOR_DESCRIPTION_USAGE'
      }
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, args: { [key: string]: string | null }): Promise<Message> {
    try {
      const provider = this.getProvider(message);
      const id = this.getID(message);

      // Reset the default color
      if (!args.color) {
        await provider.update(id, { settings: { color: EMBED_COLOR_DEFAULT } });
        return this.embed(message, { description: this.t('COMMAND_COLOR_RESPONSE_RESET', message, EMBED_COLOR_DEFAULT) });
      }

      args.color = args.color.toUpperCase();

      // Check if the color actually changes
      const settings = provider.fetch(id)?.settings;
      if (settings?.color === args.color) {
        return this.warning(message, this.t('COMMAND_COLOR_RESPONSE_IDENTICAL', message));
      }

      // Save the new color
      await provider.update(id, { settings: { color: args.color } });
      return this.embed(message, { description: this.t('COMMAND_COLOR_RESPONSE_MODIFIED', message, args.color) });
    } catch (error) {
      return this.error(message, this.t('COMMAND_COLOR_RESPONSE_ERROR', message));
    }
  }

  /**
   * Validate the color that was passed in.
   */
  // @ts-ignore unused-declaration
  private *args() {
    const color = yield Argument.validate('string',
      (_message: Message, _phrase: string, value: any) => /^#[0-9a-f]{6}$/i.test(value));
    return { color };
  }

}
