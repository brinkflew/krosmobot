import { Message } from 'discord.js';
import { Command } from '@/structures';
import { MS_PER_DAY, DEFAULT_LOCALE } from '@/constants';
import { formatDate } from '@/utils';

/**
 * Creates a new poll.
 */
export default class PollCommand extends Command {

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
          'default': MS_PER_DAY
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
  public async exec(message: Message, args: { time: number; text: string[] }) {
    const time = Date.now() + args.time;
    if (!args.text) return this.error(message, this.t('COMMAND_REMIND_RESPONSE_NO_CONTENT', message));
    const settings = this.client.providers.guilds.get(message.guild!.id, 'settings', {});
    const locale = settings.locale || DEFAULT_LOCALE;

    const doc = {
      guild: message.guild?.id,
      author: message.author.id,
      channel: message.channel.id,
      content: args.text,
      locale,
      timestamp: time
    };

    void this.client.providers.reminders.set(message.id, Object.keys(doc), Object.values(doc));
    return this.success(message, this.t('COMMAND_REMIND_RESPONSE_SUCCESS', message, formatDate(time, locale, true, 'both').slice(0, -3)));
  }

}