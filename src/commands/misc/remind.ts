import { Message } from 'discord.js';
import { Command } from '@/structures';
import { formatRelative } from '@/utils';
import { TIME } from '@/constants';

/**
 * Creates a new reminder.
 */
export default class RemindCommand extends Command {

  public constructor() {
    super('remind', {
      aliases: ['remind-me', 'reminder'],
      description: {
        'short': 'COMMAND_REMIND_DESCRIPTION_SHORT',
        'extended': 'COMMAND_REMIND_DESCRIPTION_EXTENDED',
        'example': 'COMMAND_REMIND_DESCRIPTION_EXAMPLE'
      },
      args: [
        {
          id: 'time',
          match: 'option',
          flag: ['--time', '--in'],
          type: 'duration',
          unordered: true,
          description: 'COMMAND_REMIND_DESCRIPTION_ARGUMENT_TIME'
        },
        {
          id: 'text',
          match: 'rest',
          type: 'string',
          description: 'COMMAND_REMIND_DESCRIPTION_ARGUMENT_TEXT'
        }
      ]
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, args: { time: number | null; text: string }) {
    if (typeof args.text !== 'string') return this.error(message, message.t('COMMAND_REMIND_RESPONSE_NO_CONTENT'));
    if (typeof args.time !== 'number') args.time = TIME.MS_PER_DAY;
    if (args.time < TIME.MS_PER_MINUTE) return this.error(message, message.t('COMMAND_REMIND_RESPONSE_TIME_TOO_LOW'));

    const locale = this.getLocale(message);
    const doc = {
      guild: message.guild?.id,
      author: message.author.id,
      channel: message.channel.id,
      content: args.text,
      locale: locale.id,
      timestamp: Date.now() + args.time
    };

    void this.client.providers.reminders.update(message.id, doc);
    return this.success(message, message.t('COMMAND_REMIND_RESPONSE_SUCCESS', formatRelative(args.time, locale)));
  }

}
