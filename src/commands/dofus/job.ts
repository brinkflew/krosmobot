import { Message, GuildMember, Guild } from 'discord.js';
import { Command } from '@/structures';
import { Argument } from 'discord-akairo';
import { PICTURES } from '@/constants';
import { code } from '@/utils/message';
import { DofusJob } from 'types';

/**
 * Updates or shows the current jobs of a member.
 */
export default class JobCommand extends Command {

  public constructor() {
    super('job', {
      aliases: ['jobs'],
      channel: 'guild',
      description: {
        'short': 'COMMAND_JOB_DESCRIPTION_SHORT',
        'extended': 'COMMAND_JOB_DESCRIPTION_EXTENDED',
        'example': 'COMMAND_JOB_DESCRIPTION_EXAMPLE'
      },
      usage: [
        {
          id: 'job',
          description: 'COMMAND_JOB_DESCRIPTION_ARGUMENT_JOB'
        },
        {
          id: 'level',
          description: 'COMMAND_JOB_DESCRIPTION_ARGUMENT_LEVEL'
        },
        {
          id: 'member',
          description: 'COMMAND_JOB_DESCRIPTION_ARGUMENT_MEMBER'
        }
      ]
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, args: { job: DofusJob | null; level: number | null; member: GuildMember | null }): Promise<Message> {
    const provider = this.client.providers.members;

    // `!job job level` → Update level for the selected job
    if (args.job && args.level && !args.member) {
      const jobs: { [key: string]: number } = {};
      jobs[args.job] = args.level;
      void provider.update(this.memberID(message.guild!, message.member!), { jobs });
      const translated = message.t(`COMMAND_JOB_RESPONSE_JOB_${args.job.toUpperCase()}`);

      return this.embed(message, {
        author: {
          name: message.member!.displayName,
          iconURL: message.author.avatarURL() || message.author.defaultAvatarURL
        },
        thumbnail: { url: PICTURES.DOFUS_JOBS[`${args.job.toUpperCase()}`] },
        fields: [
          {
            name: message.t('COMMAND_JOB_RESPONSE_TITLE_SINGLE'),
            value: code(this.format(translated, jobs[args.job], translated.length))
          }
        ]
      });
    }

    // `!job job` → Display all users with the selected job
    if (args.job && !args.level && !args.member) {
      const { job } = args;
      const translatedJob = message.t(`COMMAND_JOB_RESPONSE_JOB_${job.toUpperCase()}`);
      const guildID = `${message.guild!.id}:`;

      const members = provider
        .filter(member => (member.id as string).startsWith(guildID) && Boolean(member.jobs[job]))
        .sort((a, b) => (b.jobs[job] || 1) - (a.jobs[job] || 1));

      const resolving = members.map(member => {
        const id = (member.id as string).replace(guildID, '');
        const resolved = this.client.util.resolveMember(id, message.guild!.members.cache);
        if (!resolved) return message.guild!.members.fetch(id);
        return resolved;
      });

      const resolved = await Promise.allSettled(resolving);
      const pairs: Map<string, number> = new Map();
      let length = 0;

      await Promise.all(
        resolved.map(async settled => {
          if (settled.status !== 'fulfilled') return;
          const member = await settled.value;
          length = Math.max(length, member.displayName.length);
          pairs.set(member.displayName, members.find(m => m.id === `${guildID}${member.id}`)?.jobs[job] || 1);
        })
      );

      if (!pairs.size) return this.warning(message, message.t('COMMAND_JOB_RESPONSE_NOBODY', translatedJob));

      return this.embed(message, {
        author: {
          name: message.guild!.name,
          iconURL: message.guild!.iconURL() || undefined
        },
        thumbnail: { url: PICTURES.DOFUS_JOBS[`${job.toUpperCase()}`] },
        fields: [
          {
            name: translatedJob,
            value: code(
              Array.from(pairs)
                .map(([member, level]) => this.format(member, level, length))
                .join('\n')
            )
          }
        ]
      });
    }

    // `!job` → Display all jobs for the current user
    if (!args.job && !args.level && !args.member) args.member = this.client.util.resolveMember(message.author.id, message.guild!.members.cache);

    // `!job member` → Display all jobs for the selected user
    if (!args.job && !args.level && args.member) {
      const translated = message.t('COMMAND_JOB_RESPONSE_NOJOBS', args.member.displayName);
      const cached = provider.get(this.memberID(message.guild!, args.member));

      if (!cached) return this.warning(message, translated);

      const jobs = Object.entries(cached.jobs)
        .filter(job => !job[0].startsWith('$') && (job[1] || 0) > 0)
        .map(job => {
          job[0] = message.t(`COMMAND_JOB_RESPONSE_JOB_${job[0].toUpperCase()}`);
          return job;
        })
        .sort((a, b) => a[0].localeCompare(b[0]));

      if (!jobs) return this.warning(message, translated);

      let length = 0;
      jobs.forEach(job => length = Math.max(length, job[0].length));

      return this.embed(message, {
        author: {
          name: args.member.displayName,
          iconURL: args.member.user.displayAvatarURL() || args.member.user.defaultAvatarURL
        },
        fields: [
          {
            name: message.t('COMMAND_JOB_RESPONSE_TITLE_ALL'),
            value: code(
              jobs
                .map(pair => this.format(pair[0], pair[1] || 1, length))
                .join('\n')
            )
          }
        ]
      });
    }

    // `!job job member` → Display the selected job for the selected member
    if (args.job && !args.level && args.member) {
      const translated = message.t(`COMMAND_JOB_RESPONSE_JOB_${args.job.toUpperCase()}`);
      const cached = provider.get(this.memberID(message.guild!, args.member));

      if (!cached) return this.warning(message, message.t('COMMAND_JOB_RESPONSE_NOJOB', args.member.displayName, translated));

      const level = cached.jobs[args.job] || 1;

      return this.embed(message, {
        author: {
          name: message.member!.displayName,
          iconURL: message.author.avatarURL() || message.author.defaultAvatarURL
        },
        thumbnail: { url: PICTURES.DOFUS_JOBS[`${args.job.toUpperCase()}`] },
        fields: [
          {
            name: message.t('COMMAND_JOB_RESPONSE_TITLE_SINGLE'),
            value: code(this.format(translated, level, translated.length))
          }
        ]
      });
    }

    return this.error(message, message.t('COMMAND_JOBS_RESPONSE_INVALID_COMBINATION', args));
  }

  /**
   * Pads a line to aligns levels to the right while keeping it staigth with
   * the name of the associated job or member.
   * @param name Name of the job or member to display
   * @param level Level for this job and member
   * @param maxLength Max length for the generated line
   */
  private format(name: string, level: number, maxLength = 15): string {
    const fixed = level.toFixed(0);
    return `${name} ${' '.repeat(maxLength - name.length - fixed.length + 3)} ${fixed}`;
  }

  /**
   * Format the ID of a member for use with the members provider.
   * @param guild Guild the member is linked to
   * @param member Member within the aforementionned guild
   */
  private memberID(guild: Guild, member: GuildMember) {
    if (!guild) return member.id;
    return `${guild.id}:${member.id}`;
  }

  /**
   * Parses the arguments.
   */
  // @ts-ignore unused-declaration
  private *args(message: Message) {
    const args = {
      job: yield { type: 'dofusJob', unordered: true },
      level: yield { type: 'integer', unordered: true },
      member: yield { type: 'member', unordered: true }
    };

    let unknown: any[] = yield { type: Argument.union('dofusJob', 'integer', 'member', 'string'), match: 'separate', unordered: true };
    unknown = unknown?.filter(value => !Object.values(args).includes(value));

    if (args.level) {
      if (!args.job) {
        void this.warning(message, message.t('COMMAND_JOBS_ARGUMENTS_LEVEL_IGNORED'));
        args.level = null;
      } else if (args.level < 1 || args.level > 200) {
        args.level = Math.min(200, Math.max(1, args.level));
      }
    }

    if (unknown?.length) void this.warning(message, message.t('COMMAND_JOBS_ARGUMENTS_UNKNOWN', unknown));

    return args;
  }

}
