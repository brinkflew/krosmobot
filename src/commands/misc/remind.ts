import { Message } from 'discord.js';
import { Command } from '@/structures';
import { TIME } from '@/constants';
import { matcher } from '@/arguments/time/duration';
import { formatRelative } from '@/utils';

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
        'example': 'COMMAND_REMIND_DESCRIPTION_EXAMPLE',
        'usage': 'COMMAND_REMIND_DESCRIPTION_USAGE'
      },
      args: [
        {
          'id': 'time',
          'type': 'duration',
          'default': TIME.MS_PER_DAY,
          'unordered': true
        },
        {
          id: 'text',
          match: 'rest',
          type: 'string'
        }
      ]
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, args: { time: number; text: string }) {
    if (typeof args.text !== 'string') return this.error(message, this.t('COMMAND_REMIND_RESPONSE_NO_CONTENT', message));
    args.text = args.text.replace(matcher, '').trim();

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
    return this.success(message, this.t('COMMAND_REMIND_RESPONSE_SUCCESS', message, formatRelative(args.time, locale)));
  }

}
