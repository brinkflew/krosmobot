import { Message } from 'discord.js';
import { Command } from '@/structures';
import { padNumber } from '@/utils';
import { EMOJIS } from '@/constants';
import { IssueDocument, IssueDocumentStatus, IssueDocumentType } from 'types';

/**
 * Get the latency between the user and the client,
 * and between the client and the Discord servers
 */
export default class IssueCommand extends Command {

  public constructor() {
    super('issues', {
      aliases: ['bugs', 'requests', 'features', 'ideas'],
      channel: 'guild',
      description: {
        'short': 'COMMAND_ISSUES_DESCRIPTION_SHORT',
        'extended': 'COMMAND_ISSUES_DESCRIPTION_EXTENDED',
        'example': 'COMMAND_ISSUES_DESCRIPTION_EXAMPLE'
      },
      args: [
        {
          'id': 'state',
          'type': ['pending', 'cancel', 'dev', 'block', 'test', 'deploy'],
          'match': 'option',
          'flag': ['--state', '--status', '-s'],
          'description': 'COMMAND_ISSUE_DESCRIPTION_ARGUMENT_STATE',
          'default': 'pending',
          'prompt': {
            retry: (message: Message) => message.t('COMMAND_ISSUE_PROMPT_RETRY_STATE'),
            optional: true
          }
        },
        {
          'id': 'type',
          'type': ['bug', 'feature', 'unknown'],
          'match': 'option',
          'flag': ['--type', '-t'],
          'description': 'COMMAND_ISSUE_DESCRIPTION_ARGUMENT_TYPE',
          'default': 'unknown',
          'prompt': {
            retry: (message: Message) => message.t('COMMAND_ISSUE_PROMPT_RETRY_TYPE'),
            optional: true
          }
        }
      ]
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, args: { title: string; description: string; state: IssueDocumentStatus; type: IssueDocumentType; list: boolean }) {
    const stateFlag = this.isFlagSet('state', message);
    const typeFlag = this.isFlagSet('type', message);
    const provider = this.client.providers.issues;
    let issues: IssueDocument[] = [];

    if (stateFlag && typeFlag) {
      issues = provider.filter(i => i.status === args.state && i.type === args.type);
    } else if (stateFlag) {
      issues = provider.filter(i => i.status === args.state);
    } else if (typeFlag) {
      issues = provider.filter(i => i.type === args.type);
    } else {
      issues = provider.cache.array();
    }

    if (!issues.length) return this.success(message, message.t('COMMAND_ISSUES_RESPONSE_LIST_NO_ISSUES'));

    const fields: { name: string; value: string }[] = [];
    const states = stateFlag ? [args.state] : ['pending', 'dev', 'test', 'block'];

    states.forEach(state => {
      const name = message.t(`COMMAND_ISSUE_RESPONSE_STATE_${state}`.toUpperCase());
      const filtered = issues.filter(issue => issue.status === state);

      if (filtered.length) {
        const values = filtered
          .sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10))
          .map(issue => `${EMOJIS.ISSUE_TYPE_ICONS[issue.type]} \`[\#${padNumber(issue.id, 6)}]\` ${issue.title}`);

        fields.push({ name: `${name} (${values.length})`, value: values.join('\n') });
      }
    });

    return this.embed(message, {
      title: message.t('COMMAND_ISSUES_RESPONSE_LIST_TITLE'),
      fields
    });
  }

  /**
   * Checks whether a flag was set in the message that triggered the command.
   * @param id ID of the flag to check for
   * @param message Message that triggered the command
   */
  private isFlagSet(id: string, message: Message) {
    const flag = this.argumentsUsage.find(arg => arg.id === id)?.flag;
    if (!flag) return false;
    if (!Array.isArray(flag)) return message.cleanContent.includes(flag);

    for (const f of flag) {
      if (message.cleanContent.includes(f)) return true;
    }

    return false;
  }

}
