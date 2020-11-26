import { Argument } from 'discord-akairo';
import { Message } from 'discord.js';
import { Command } from '@/structures';
import { DEFAULT } from '@/constants/colors';

/**
 * Change the color used in embed borders for the current guild.
 */
export default class ColorCommand extends Command {
  constructor() {
    super('color', {
      userPermissions: ['MANAGE_GUILD']
    });
  }

  /**
   * Validate the color that was passed in.
   */
  *args() {
    const color = yield Argument.validate('string',
      (_message: Message, _phrase: string, value: any) => /^#[0-9a-f]{6}$/i.test(value)
    );
    return { color };
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, { color }: any): Promise<Message> {
    try {
     // Reset the default color
      if (!color) {
        await this.set(message.guild!, 'color', DEFAULT);
        return this.embed(message, { description: this.t('COMMAND_COLOR_RESPONSE_RESET', message, DEFAULT) });
      }

      color = color.toUpperCase();

      // Check if the color actually changes
      let oldColor = this.get(message.guild!, 'color', DEFAULT);
      if (oldColor === color)
        return this.warning(message, this.t('COMMAND_COLOR_RESPONSE_IDENTICAL', message));

      // Save the new color
      await this.set(message.guild!, 'color', color);
      return this.embed(message, { description: this.t('COMMAND_COLOR_RESPONSE_MODIFIED', message, color) });
    } catch (error) {
      return this.error(message, this.t('COMMAND_COLOR_RESPONSE_ERROR', message));
    }
  }
}
