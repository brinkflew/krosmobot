import { Message, TextChannel } from 'discord.js';
import { Command } from '@/structures';

/**
 * Change the color used in embed borders for the current guild.
 */
export default class ColorCommand extends Command {
  constructor() {
    super('set', {
      channel: 'guild',
      userPermissions: ['MANAGE_GUILD'],
      description: {
        short: 'COMMAND_SET_DESCRIPTION_SHORT',
        extended: 'COMMAND_SET_DESCRIPTION_EXTENDED',
        example: 'COMMAND_SET_DESCRIPTION_EXAMPLE',
        usage: 'COMMAND_SET_DESCRIPTION_USAGE'
      },
      args: [
        {
          id: 'almanaxAuto',
          match: 'option',
          flag: 'almanax.auto',
          type: [
            ['enable', 'y', 'yes', 'true'],
            ['disable', 'n', 'no', 'false'],
          ]
        },
        {
          id: 'almanaxChannel',
          match: 'option',
          flag: 'almanax.channel',
          type: 'textChannel'
        }
      ]
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, { almanaxAuto, almanaxChannel }: { almanaxAuto: string, almanaxChannel: TextChannel }): Promise<Message> {
    try {
      const keys = [];
      const actions = [];

      const isSet = {
        almanaxAuto: ['enable', 'disable'].includes(almanaxAuto),
        almanaxChannel: almanaxChannel instanceof TextChannel
      };
      
      if (isSet.almanaxAuto || isSet.almanaxChannel) {
        const almanaxConfig = this.get(message.guild!, 'almanax', {});

        if (isSet.almanaxAuto) {
          almanaxConfig.auto = almanaxAuto === 'enable' ? true :  false;
          keys.push('almanax.auto');
        }

        if (isSet.almanaxChannel) {
          almanaxConfig.channel = almanaxChannel.id;
          keys.push('almanax.channel');
        }

        actions.push(this.set(message.guild!, 'almanax', almanaxConfig));
      }
      
      await Promise.all(actions);
      return this.success(message, this.t('COMMAND_SET_RESPONSE_MODIFIED', message, keys));
    } catch (error) {
      return this.error(message, this.t('COMMAND_SET_RESPONSE_ERROR', message));
    }
  }
}
