import { Message } from 'discord.js';
import { Command } from '@/structures';
import { MS_PER_DAY, pollReactions, ARGUMENT_TYPE_BOOLEAN } from '@/constants';
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
        'example': 'COMMAND_POLL_DESCRIPTION_EXAMPLE',
        'usage': 'COMMAND_POLL_DESCRIPTION_USAGE'
      },
      channel: 'guild',
      args: [
        {
          'id': 'time',
          'match': 'option',
          'flag': 'time:',
          'type': 'duration',
          'default': MS_PER_DAY,
          'unordered': true
        },
        {
          'id': 'multi',
          'match': 'option',
          'flag': 'multi:',
          'type': ARGUMENT_TYPE_BOOLEAN,
          'default': 'true',
          'unordered': true
        },
        {
          id: 'text',
          match: 'rest',
          type: 'line'
        }
      ]
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, args: { time: number; text: string[]; multi: string }) {
    const title = args.text.shift();
    if (!title) return this.error(message, this.t('COMMAND_POLL_RESPONSE_NO_TITLE', message));

    if (args.text.length === 1) return this.error(message, this.t('COMMAND_POLL_RESPONSE_NOT_ENOUGH_PROPOSITIONS', message));
    if (Math.max(...args.text.map(t => t.length)) > 96) return this.error(message, this.t('COMMAND_POLL_RESPONSE_PROPOSITION_TOO_LONG', message));
    if (!args.text.length) args.text = [this.t('YES', message), this.t('NO', message)];

    const time = Date.now() + args.time;
    const locale = this.getLocale(message);
    const propositions = args.text.map((prop, index) => `${pollReactions[index + 1]} ${prop}`);
    const reactions = pollReactions.slice(0, propositions.length + 1);

    const sent = await this.embed(message, {
      author: {
        name: message.member!.displayName,
        iconURL: message.author.displayAvatarURL() || message.author.defaultAvatarURL
      },
      title: this.t('COMMAND_POLL_RESPONSE_TITLE', message, title),
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
