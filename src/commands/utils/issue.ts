import { Message, TextChannel } from 'discord.js';
import { Command } from '@/structures';
import { formatDate, padNumber } from '@/utils';
import { DEFAULTS, EMBEDS } from '@/constants';
import { IssueDocument } from 'types';

/* eslint-disable @typescript-eslint/naming-convention */
const STATE_COLORS: { [key: string]: string } = {
  cancel: EMBEDS.COLORS.GREY,
  dev: EMBEDS.COLORS.BLUE,
  test: EMBEDS.COLORS.YELLOW,
  deploy: EMBEDS.COLORS.GREEN,
  block: EMBEDS.COLORS.RED,
  pending: EMBEDS.COLORS.MAGENTA
};

const TYPE_ICONS: { [key: string]: string } = {
  bug: '🐞',
  feature: '💡',
  unknown: '❔'
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
          'flag': '--state',
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
          'flag': '--type',
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
  public async exec(message: Message, args: {
    title: string;
    description: string;
    state: 'pending' | 'cancel' | 'dev' | 'block' | 'test' | 'deploy';
    type: 'bug' | 'feature' | 'unknown';
  }) {
    const sanitized = args.title.replace(/^#?0*/, '');
    const issue = this.client.providers.issues.find(issue => issue.id === sanitized);

    if (args.state && !this.client.isOwner(message.author)) {
      return this.error(message, message.t('COMMAND_ISSUE_RESPONSE_CHANGE_STATE_OWNERS_ONLY'));
    }

    if (args.type && !this.client.isOwner(message.author)) {
      return this.error(message, message.t('COMMAND_ISSUE_RESPONSE_CHANGE_TYPE_OWNERS_ONLY'));
    }

    if (!issue) return this.createIssue(message, args.title, args.description, args.state, args.type);

    const stateFlag = this.getFlag('state')!;
    const state = message.cleanContent.includes(stateFlag) ? args.state : issue.status;

    const typeFlag = this.getFlag('type')!;
    const type = message.cleanContent.includes(typeFlag) ? args.type : issue.type;

    return this.updateIssue(message, issue, args.description, state, type);
  }

  /**
   * Get the flag for a specific argument
   * @param id ID of the argument to find the flag of
   */
  private getFlag(id: string) {
    const flag = this.argumentsUsage.find(arg => arg.id === id)?.flag;
    if (Array.isArray(flag)) return flag[0];
    return flag;
  }

  /**
   * Saves a new issue and notify the developpers.
   * @param message Message that triggered the command
   * @param title Title of the issue
   * @param description Description of the issue
   * @param state Status of the issue
   * @param type Type of issue (bug or feature request)
   */
  private async createIssue(message: Message, title: string, description: string, state: string, type: string) {
    const id = `${this.issueID}`;
    const guild = this.client.util.resolveGuild(DEFAULTS.SUPPORT_GUILD, this.client.guilds.cache);
    const tracker = this.client.util.resolveChannel(DEFAULTS.ISSUES_CHANNEL, guild.channels.cache);
    const tType = this.t(`COMMAND_ISSUE_RESPONSE_TYPE_${type}`.toUpperCase(), message);
    const tState = this.t(`COMMAND_ISSUE_RESPONSE_STATE_${state}`.toUpperCase(), message);
    const embed = this.craftEmbed(message, {
      color: STATE_COLORS[state],
      author: {
        name: message.member?.displayName || message.author.username,
        iconURL: message.author.displayAvatarURL()
      },
      title: `[\#${padNumber(id, 6)}] ${title}`,
      description,
      footer: { text: `${TYPE_ICONS[type]} ${tType} \u2022 ${tState}` },
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
  private async updateIssue(message: Message, issue: IssueDocument, description: string, state: string, type: string) {
    const messages = issue.messages.map((id, index) => {
      const guild = this.client.util.resolveGuild(issue.guilds[index], this.client.guilds.cache);
      const channel = this.client.util.resolveChannel(issue.channels[index], guild.channels.cache) as TextChannel;
      return channel.messages.fetch(id);
    });

    const resolved = await Promise.all(messages);
    const embed = resolved[0].embeds[0];
    const updated = Date.now();

    embed.setTimestamp(updated);

    const tState = this.t(`COMMAND_ISSUE_RESPONSE_STATE_${state}`.toUpperCase(), resolved[0]);
    const tType = this.t(`COMMAND_ISSUE_RESPONSE_TYPE_${type}`.toUpperCase(), resolved[0]);
    const tComments = this.t('COMMAND_ISSUE_RESPONSE_FIELD_TITLE_COMMENTS', resolved[0]);
    const fields = [{ name: tComments, value: description }];

    if (issue.status !== state) {
      const tStatusTitle = this.t('COMMAND_ISSUE_RESPONSE_FIELD_TITLE_STATUS', resolved[0]);
      const tOldState = this.t(`COMMAND_ISSUE_RESPONSE_STATE_${issue.status}`.toUpperCase(), resolved[0]);
      fields.unshift({ name: tStatusTitle, value: `${tOldState} → ${tState}` });
      embed.setColor(STATE_COLORS[state]);
    }

    if (issue.type !== type) {
      const tTypeTitle = this.t('COMMAND_ISSUE_RESPONSE_FIELD_TITLE_TYPE', resolved[0]);
      const tOldType = this.t(`COMMAND_ISSUE_RESPONSE_TYPE_${issue.type}`.toUpperCase(), resolved[0]);
      fields.unshift({ name: tTypeTitle, value: `${tOldType} → ${tType}` });
    }

    const date = formatDate(updated, issue.locale, true, 'both');
    embed
      .setFooter(`${TYPE_ICONS[type]} ${tType} \u2022 ${tState}`)
      .addField(
        EMBEDS.SEPARATORS.VERTICAL.name,
        this.t('COMMAND_ISSUE_RESPONSE_FIELD_UPDATED_AT', message, date.slice(0, date.length - 3))
      )
      .addFields(fields);

    const notification = this.craftEmbed(resolved[0], {
      color: this.getProvider(message).fetch(resolved[0].guild!.id)?.settings.color || EMBEDS.COLORS.DEFAULT,
      author: {
        name: message.author.username,
        iconURL: message.author.displayAvatarURL()
      },
      description: this.t('COMMAND_ISSUE_RESPONSE_UPDATED', message, `[[\#${padNumber(issue.id, 6)}] ${issue.title}](${resolved[0].url})`),
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
