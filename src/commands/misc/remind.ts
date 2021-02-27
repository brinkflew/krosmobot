import { Message } from 'discord.js';
import { Command } from '@/structures';
import { formatDate } from '@/utils';
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
          id: 'in',
          match: 'option',
          flag: ['--in'],
          type: 'duration',
          description: 'COMMAND_REMIND_DESCRIPTION_ARGUMENT_IN'
        },
        {
          id: 'on',
          match: 'option',
          flag: ['--on'],
          type: 'date',
          description: 'COMMAND_REMIND_DESCRIPTION_ARGUMENT_ON'
        },
        {
          id: 'at',
          match: 'option',
          flag: ['--at'],
          type: 'time',
          description: 'COMMAND_REMIND_DESCRIPTION_ARGUMENT_AT'
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
  public async exec(message: Message, args: { in: number | null; on: number | null; at: number | null; text: string }) {
    if (typeof args.text !== 'string') return this.error(message, message.t('COMMAND_REMIND_RESPONSE_NO_CONTENT'));
    if (args.in && (args.on || args.at)) return this.error(message, message.t('COMMAND_REMIND_RESPONSE_INVALID_COMBINATION'));

    let timestamp = 0;

    if (args.on && args.at) {
      timestamp = args.on + args.at;
    } else if (args.on && !args.at) {
      const now = new Date();
      timestamp = args.on + ((now.getHours() - 1) * TIME.MS_PER_HOUR) + (now.getMinutes() * TIME.MS_PER_MINUTE);
    } else if (!args.on && args.at) {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      timestamp = args.at + now.valueOf();
    } else {
      timestamp = Date.now() + (args.in || TIME.MS_PER_DAY);
    }

    if (timestamp < Date.now() + TIME.MS_PER_MINUTE) return this.error(message, message.t('COMMAND_REMIND_RESPONSE_TIME_TOO_LOW'));

    const locale = this.getLocale(message);
    const doc = {
      guild: message.guild?.id,
      author: message.author.id,
      channel: message.channel.id,
      content: args.text,
      locale: locale.id,
      timestamp
    };

    void this.client.providers.reminders.update(message.id, doc);
    return this.success(message, message.t('COMMAND_REMIND_RESPONSE_SUCCESS', formatDate(timestamp, locale.id, true, 'both').slice(0, -3)));
  }

}
