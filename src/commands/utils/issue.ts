import { Message, TextChannel } from 'discord.js';
import { Command } from '@/structures';
import { formatDate, padNumber } from '@/utils';
import { DEFAULTS, EMBEDS, EMOJIS } from '@/constants';
import { IssueDocument, IssueDocumentStatus, IssueDocumentType } from 'types';

/* eslint-disable @typescript-eslint/naming-convention */
const STATE_COLORS: { [key: string]: string } = {
  cancel: EMBEDS.COLORS.GREY,
  dev: EMBEDS.COLORS.BLUE,
  test: EMBEDS.COLORS.YELLOW,
  deploy: EMBEDS.COLORS.GREEN,
  block: EMBEDS.COLORS.RED,
  pending: EMBEDS.COLORS.MAGENTA
};
/* eslint-enable @typescript-eslint/naming-convention */

/**
 * Get the latency between the user and the client,
 * and between the client and the Discord servers
 */
export default class IssueCommand extends Command {

  public constructor() {
    super('issue', {
      aliases: ['bug', 'request', 'feature', 'idea'],
      channel: 'guild',
      description: {
        'short': 'COMMAND_ISSUE_DESCRIPTION_SHORT',
        'extended': 'COMMAND_ISSUE_DESCRIPTION_EXTENDED',
        'example': 'COMMAND_ISSUE_DESCRIPTION_EXAMPLE'
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
        },
        {
          id: 'title',
          type: 'oneline',
          match: 'text',
          description: 'COMMAND_ISSUE_DESCRIPTION_ARGUMENT_TITLE',
          prompt: {
            start: (message: Message) => message.t('COMMAND_ISSUE_PROMPT_START_TITLE')
          }
        },
        {
          id: 'description',
          type: 'string',
          match: 'none',
          description: 'COMMAND_ISSUE_DESCRIPTION_ARGUMENT_DESCRIPTION',
          prompt: {
            start: (message: Message) => message.t('COMMAND_ISSUE_PROMPT_START_DESCRIPTION')
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
    const sanitized = args.title.replace(/^#?0*/, '');
    const issue = this.client.providers.issues.find(issue => issue.id === sanitized);

    if (args.state && !this.client.isOwner(message.author)) {
      return this.error(message, message.t('COMMAND_ISSUE_RESPONSE_CHANGE_STATE_OWNERS_ONLY'));
    }

    if (!issue) return this.createIssue(message, args.title, args.description, args.state, args.type);

    if (args.type && !this.client.isOwner(message.author)) {
      return this.error(message, message.t('COMMAND_ISSUE_RESPONSE_CHANGE_TYPE_OWNERS_ONLY'));
    }

    const state = this.isFlagSet('state', message) ? args.state : issue.status;
    const type = this.isFlagSet('type', message) ? args.type : issue.type;

    return this.updateIssue(message, issue, args.description, state, type);
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

  /**
   * Saves a new issue and notify the developpers.
   * @param message Message that triggered the command
   * @param title Title of the issue
   * @param description Description of the issue
   * @param state Status of the issue
   * @param type Type of issue (bug or feature request)
   */
  private async createIssue(message: Message, title: string, description: string, state: IssueDocumentStatus, type: IssueDocumentType) {
    if (type === 'unknown') {
      switch (message.util?.parsed?.alias) {
        case 'bug':
        case 'issue':
          type = 'bug';
          break;
        case 'request':
        case 'feature':
        case 'idea':
          type = 'feature';
          break;
        default:
          break;
      }
    }

    const id = `${this.issueID}`;
    const guild = this.client.util.resolveGuild(DEFAULTS.SUPPORT_GUILD, this.client.guilds.cache);
    const tracker = this.client.util.resolveChannel(DEFAULTS.ISSUES_CHANNEL, guild.channels.cache);
    const tType = message.t(`COMMAND_ISSUE_RESPONSE_TYPE_${type}`.toUpperCase());
    const tState = message.t(`COMMAND_ISSUE_RESPONSE_STATE_${state}`.toUpperCase());
    const embed = this.craftEmbed(message, {
      color: STATE_COLORS[state],
      author: {
        name: message.member?.displayName || message.author.username,
        iconURL: message.author.displayAvatarURL()
      },
      title: `[\#${padNumber(id, 6)}] ${title}`,
      description: description.toLowerCase() === 'skip' ? message.t('COMMAND_ISSUE_RESPONSE_NO_DESCRIPTION') : description,
      footer: { text: `${EMOJIS.ISSUE_TYPE_ICONS[type]} ${tType} \u2022 ${tState}` },
      timestamp: Date.now()
    });

    const messages: Promise<Message>[] = [message.channel.send(embed)];

    if (tracker.type === 'text' && tracker.id !== message.channel.id) messages.push((tracker as TextChannel).send(embed));
    const sent = await Promise.all(messages);

    void this.client.providers.issues.create(id, {
      messages: sent.map(m => m.id),
      channels: [message.channel.id, tracker.id],
      guilds: [message.guild!.id, guild.id],
      title,
      description,
      status: 'pending',
      type,
      locale: this.getLocale(message).id
    });
  }

  /**
   * Updates an existing issue, edits existing messages for that issue and display a notification
   * with a link to the modified tracked issue.
   * @param message Message that triggered the command
   * @param issue Old issue fetched from the database
   * @param description Comment to add to the issue's description
   * @param state New state for the issue, if any
   * @param type New type for the issue
   */
  private async updateIssue(message: Message, issue: IssueDocument, description: string, state: IssueDocumentStatus, type: IssueDocumentType) {
    const messages = issue.messages.map((id, index) => {
      const guild = this.client.util.resolveGuild(issue.guilds[index], this.client.guilds.cache);
      const channel = this.client.util.resolveChannel(issue.channels[index], guild.channels.cache) as TextChannel;
      return channel.messages.fetch(id);
    });

    const resolved = await Promise.all(messages);
    const embed = resolved[0].embeds[0];
    const updated = Date.now();

    embed.setTimestamp(updated);

    const tState = resolved[0].t(`COMMAND_ISSUE_RESPONSE_STATE_${state}`.toUpperCase());
    const tType = resolved[0].t(`COMMAND_ISSUE_RESPONSE_TYPE_${type}`.toUpperCase());
    const tComments = resolved[0].t('COMMAND_ISSUE_RESPONSE_FIELD_TITLE_COMMENTS');
    const fields = description.toLowerCase() === 'skip' ? [] : [{ name: tComments, value: description }];

    if (issue.status !== state) {
      const tStatusTitle = resolved[0].t('COMMAND_ISSUE_RESPONSE_FIELD_TITLE_STATUS');
      const tOldState = resolved[0].t(`COMMAND_ISSUE_RESPONSE_STATE_${issue.status}`.toUpperCase());
      fields.unshift({ name: tStatusTitle, value: `${tOldState} → ${tState}` });
      embed.setColor(STATE_COLORS[state]);
    }

    if (issue.type !== type) {
      const tTypeTitle = resolved[0].t('COMMAND_ISSUE_RESPONSE_FIELD_TITLE_TYPE');
      const tOldType = resolved[0].t(`COMMAND_ISSUE_RESPONSE_TYPE_${issue.type}`.toUpperCase());
      fields.unshift({ name: tTypeTitle, value: `${tOldType} → ${tType}` });
    }

    const date = formatDate(updated, issue.locale, true, 'both');
    embed
      .setFooter(`${EMOJIS.ISSUE_TYPE_ICONS[type]} ${tType} \u2022 ${tState}`)
      .addField(
        EMBEDS.SEPARATORS.VERTICAL.name,
        message.t('COMMAND_ISSUE_RESPONSE_FIELD_UPDATED_AT', date.slice(0, date.length - 3))
      )
      .addFields(fields);

    const notification = this.craftEmbed(resolved[0], {
      color: this.getProvider(message).fetch(resolved[0].guild!.id)?.settings.color || EMBEDS.COLORS.DEFAULT,
      author: {
        name: message.author.username,
        iconURL: message.author.displayAvatarURL()
      },
      description: message.t('COMMAND_ISSUE_RESPONSE_UPDATED', `[[\#${padNumber(issue.id, 6)}] ${issue.title}](${resolved[0].url})`),
      fields,
      timestamp: updated
    });

    void resolved[0].channel.send(notification);
    resolved.forEach(m => void m.edit(embed));

    void this.client.providers.issues.update(issue.id, {
      status: state,
      type
    });
  }

  /**
   * Get the next ID for new issues.
   */
  private get issueID() {
    return this.client.providers.issues.cache.size + 1;
  }

}
