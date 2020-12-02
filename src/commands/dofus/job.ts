import { Message, GuildMember, GuildEmoji } from 'discord.js';
import { Command } from '@/structures';
import { jobs as icons } from '@/constants/pictures';

/**
 * Updates or shows the current jobs of a member.
 */
export default class JobCommand extends Command {
  constructor() {
    super('job', {
      aliases: ['jobs'],
      channel: 'guild',
      description: {
        short: 'COMMAND_JOB_DESCRIPTION_SHORT',
        extended: 'COMMAND_JOB_DESCRIPTION_EXTENDED',
        example: 'COMMAND_JOB_DESCRIPTION_EXAMPLE',
        usage: 'COMMAND_JOB_DESCRIPTION_USAGE'
      },
      args: [
        {
          id: 'name',
          unordered: true,
          type: [
            ['alchemist', 'alchimiste', 'alchi'],
            ['jeweller', 'bijoutier', 'bijou'],
            ['handyman', 'bricoleur', 'brico'],
            ['lumberjack', 'bûcheron', 'bucheron', 'buch'],
            ['hunter', 'chasseur'],
            ['shoemagus', 'cordomage'],
            ['shoemaker', 'cordonier', 'cordo'],
            ['costumagus', 'costumage', 'costu'],
            ['craftmagus', 'façomage', 'facomage'],
            ['artificer', 'façonneur', 'faconneur'],
            ['smithmagus', 'forgemage'],
            ['smith', 'forgeron'],
            ['jewelmagus', 'joaillomage', 'joaillo'],
            ['miner', 'mineur'],
            ['farmer', 'paysan'],
            ['fisherman', 'pêcheur', 'pecheur'],
            ['carvmagus', 'sculptemage'],
            ['carver', 'sculpteur'],
            ['tailor', 'tailleur']
          ]
        },
        {
          id: 'level',
          unordered: true,
          type: 'number'
        },
        {
          id: 'member',
          unordered: true,
          type: 'member'
        }
      ]
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, { name, level, member }: { name: string, level: number, member: GuildMember }): Promise<Message> {
    try {
      
      // `!job tailor` → Display the single job for all users
      // `!job tailor @Member` → Display the single job for the single user

      if (name && !member && !level) {
        const fetched: { [key: string]: number }[] = [];
        const members: string[] = [];
        const cachedMembers = message.guild!.members.cache
          .array()
          .filter((member) => !member.user.bot);

        for (const member of cachedMembers) {
          fetched.push(this.get(member, 'jobs', {}));
          members.push(member.displayName);
        }

        const jobs = fetched.map((list) => list[name] || 0);
        const ordered = jobs
          .map((job, id) => { return { member: members[id], level: job } })
          .filter((job) => job.level > 0)
          .sort((a, b) => b.level - a.level);

        if (!ordered.length) {
          return this.warning(
            message,
            this.t(
              'COMMAND_JOB_RESPONSE_NOBODY',
              message,
              this.t(`COMMAND_JOB_RESPONSE_JOB_${name.toUpperCase()}`, message)
            )
          );
        }

        return this.embed(message, {
          author: {
            name: message.guild!.name,
            icon_url: message.guild!.iconURL() || undefined
          },
          thumbnail: { url: icons[name] },
          fields: [
            {
              name: this.t(`COMMAND_JOB_RESPONSE_JOB_${name.toUpperCase()}`, message),
              value: ordered.map((field) => field.member).join('\n'),
              inline: true
            },
            {
              name: '\u200B',
              value: ordered.map((field) => field.level).join('\n'),
              inline: true
            }
          ]
        });
      }
      
      let target = message.member!;
      if (member) target = member;

      const jobs: { [key: string]: number } = this.get(target, 'jobs', {});

      const author = {
        name: target.displayName,
        icon_url: target.user.avatarURL() || target.user.defaultAvatarURL,
      };

      // `!job @Member` → Display all jobs for the single user
      // `!job` → Display all jobs for self
      // `!job tailor 125` → Display all jobs for self
      
      if (!name) {
        let fields: { job: string, level: number, emoji: GuildEmoji | string }[] = [];
        const ordered = Object
          .entries(jobs)
          .sort((a, b) => a[0].localeCompare(b[0]));

        for (const [job, level] of ordered) {
          if (!Object.prototype.hasOwnProperty.call(jobs, job) || !level || typeof level != 'number') continue;

          fields.push({
            job: this.t(`COMMAND_JOB_RESPONSE_JOB_${job.toUpperCase()}`, message),
            level,
            emoji: this.client.emojis.cache.find((emoji) => emoji.name.includes(job)) || ':grey_question:'
          });
        }

        if (!fields.length) return this.warning(message, this.t('COMMAND_JOB_RESPONSE_NOJOBS', message, target.displayName));
        fields = fields.sort((a, b) => a.job.localeCompare(b.job));

        return this.embed(message, {
          author,
          fields: [
            {
              name: this.t('COMMAND_JOB_RESPONSE_TITLE_ALL', message),
              value: fields
                .map((field) => `${field.emoji} ${field.job}`)
                .join('\n'),
              inline: true
            },
            {
              name: '\u200B',
              value: fields.map((field) => field.level).join('\n'),
              inline: true
            }
          ]
        });
      }

      if (level) {
        level = Math.min(level, 200);
        level = Math.max(level, 0);
        jobs[name] = level;
        if (!member) this.set(message.member!, 'jobs', jobs);
      }

      return this.embed(message, {
        author: {
          name: target.displayName,
          icon_url: target.user.avatarURL() || target.user.defaultAvatarURL
        },
        thumbnail: { url: icons[name] },
        fields: [
          {
            name: this.t('COMMAND_JOB_RESPONSE_TITLE_SINGLE', message),
            value: this.t(`COMMAND_JOB_RESPONSE_JOB_${name.toUpperCase()}`, message),
            inline: true
          },
          { name: '\u200B', value: jobs[name] || 0, inline: true }
        ]
      });
    } catch (error) {
      console.log(error);
      return this.error(message, this.t('COMMAND_JOB_RESPONSE_ERROR', message));
    }
  }
}
