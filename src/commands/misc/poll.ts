import { Message } from 'discord.js';
import { Command } from '@/structures';
import { EMOJIS, ARGUMENTS, TIME } from '@/constants';
import { formatDate } from '@/utils';

/**
 * Creates a new poll.
 */
export default class PollCommand extends Command {

  public constructor() {
    super('poll', {
      description: {
        'short': 'COMMAND_POLL_DESCRIPTION_SHORT',
        'extended': 'COMMAND_POLL_DESCRIPTION_EXTENDED',
        'example': 'COMMAND_POLL_DESCRIPTION_EXAMPLE'
      },
      channel: 'guild',
      args: [
        {
          id: 'time',
          match: 'option',
          flag: ['--close-in', '--close', '--end', '--time'],
          type: 'duration',
          unordered: true,
          description: 'COMMAND_POLL_DESCRIPTION_ARGUMENT_TIME'
        },
        {
          'id': 'multi',
          'match': 'option',
          'flag': ['--multi', '--allow-multi'],
          'type': ARGUMENTS.BOOLEAN,
          'default': 'true',
          'unordered': true,
          'description': 'COMMAND_POLL_DESCRIPTION_ARGUMENT_MULTI'
        },
        {
          id: 'text',
          match: 'rest',
          type: 'line',
          description: 'COMMAND_POLL_DESCRIPTION_ARGUMENT_TEXT'
        }
      ]
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, args: { time: number | null; text: string[] | null; multi: string }) {
    if (typeof args.time !== 'number') args.time = TIME.MS_PER_DAY;
    if (args.time < TIME.MS_PER_MINUTE) return this.error(message, message.t('COMMAND_POLL_RESPONSE_TIME_TOO_LOW'));

    if (!args.text?.length) return this.error(message, message.t('COMMAND_POLL_RESPONSE_NO_TITLE'));
    const title = args.text.shift();

    if (args.text.length === 1) return this.error(message, message.t('COMMAND_POLL_RESPONSE_NOT_ENOUGH_PROPOSITIONS'));
    if (Math.max(...args.text.map(t => t.length)) > 96) return this.error(message, message.t('COMMAND_POLL_RESPONSE_PROPOSITION_TOO_LONG'));
    if (!args.text.length) args.text = [message.t('YES'), message.t('NO')];

    const time = Date.now() + args.time;
    const locale = this.getLocale(message);
    const propositions = args.text.map((prop, index) => `${EMOJIS.POLL_REACTIONS[index + 1]} ${prop}`);
    const reactions = EMOJIS.POLL_REACTIONS.slice(0, propositions.length + 1);

    const sent = await this.embed(message, {
      author: {
        name: message.member!.displayName,
        iconURL: message.author.displayAvatarURL() || message.author.defaultAvatarURL
      },
      title: message.t('COMMAND_POLL_RESPONSE_TITLE', title),
      description: propositions.join('\n'),
      footer: {
        text: this.t('COMMAND_POLL_RESPONSE_FOOTER', message, reactions, formatDate(time, locale.id, true, 'both').slice(0, -3))
      }
    });

    for (const reaction of reactions) await sent.react(reaction);

    const doc = {
      guild: message.guild!.id,
      author: message.author.id,
      channel: message.channel.id,
      title,
      propositions: args.text,
      answers: new Array(propositions.length).fill([]),
      timestamp: time,
      multi: args.multi === 'true' ? true : false
    };

    void this.client.providers.polls.create(sent.id, doc);
    return sent;
  }

}
