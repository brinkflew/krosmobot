/* eslint-disable @typescript-eslint/naming-convention */

import { oneLine, stripIndent } from 'common-tags';
import { Locale } from '@/structures';
import { code, usage, argument, formatNumber } from '@/utils';

export default class EnglishLocale extends Locale {

  public constructor() {
    super('en');

    this.strings = {
      // Misc.
      DEFAULT: (key: string) => `${key} has not been translated to ${this.language.toUpperCase()} yet.`,
      DEFAULT_LANGUAGE: 'Default language.',

      // Languages
      LANG_EN: 'English',
      LANG_FR: 'French',

      // Timings
      TIMING_SECOND: (seconds: number) => `${seconds} second${seconds > 1 ? 's' : ''}`,
      TIMING_MINUTE: (minutes: number) => `${minutes} minute${minutes > 1 ? 's' : ''}`,
      TIMING_HOUR: (hours: number) => `${hours} hour${hours > 1 ? 's' : ''}`,
      TIMING_DAY: (days: number) => `${days} day${days > 1 ? 's' : ''}`,
      TIMING_MONTH: (months: number) => `${months} month${months > 1 ? 's' : ''}`,
      TIMING_YEAR: (years: number) => `${years} year${years > 1 ? 's' : ''}`,

      // Yes / No
      YES: 'Yes',
      NO: 'No',

      // Message statuses
      MESSAGE_STATUS_SUCCESS: 'Yoohoo!',
      MESSAGE_STATUS_ERROR: 'Ouch!',
      MESSAGE_STATUS_WARNING: 'Hmmm...',

      // TWITTER Task
      TASK_TWITTER_ORIGINAL_TWEET: 'Open original',
      TASK_TWITTER_FOOTER: 'Seen on Twitter',

      // PING Command
      COMMAND_PING_DESCRIPTION_SHORT: 'Latency between this bot and Discord.',
      COMMAND_PING_DESCRIPTION_EXTENDED: stripIndent`
        ${oneLine`
          Check the latency between the bot and the user, as well as between the bot and Discord's servers.
        `}
        ${oneLine`
          - The *Round-Trip Time (RTT)* represents the time for the bot to send a message,
          received acknowledgement from Discord that it was posted and edit that message.
        `}
        ${oneLine`
          - The *Heartbeat* represents the latency between the bot and Discord's servers.
        `}
      `,
      COMMAND_PING_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Display the current latency:
        ${usage(prefix, 'ping')}
      `,
      COMMAND_PING_DESCRIPTION_USAGE: (prefix: string) => usage(prefix, 'ping'),
      COMMAND_PING_RESPONSE_TITLE: 'Pong!',
      COMMAND_PING_RESPONSE_RTT: 'Round-Trip Time',
      COMMAND_PING_RESPONSE_HEARTBEAT: 'Heartbeat',

      // PREFIX Command
      COMMAND_PREFIX_DESCRIPTION_SHORT: 'Modifies the prefix in this guild.',
      COMMAND_PREFIX_DESCRIPTION_EXTENDED: oneLine`
        This command allows modifying the prefix used on a Discord guild.
        The prefix is a character or a characters string (maxi. 10) which, when used
        in front of a message, tells the bot that this is a command it should respond to.
      `,
      COMMAND_PREFIX_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Modify the current prefix to \`$\`:
        ${usage(prefix, 'prefix $')}
        Reset the default prefix:
        ${usage(prefix, 'prefix')}
      `,
      COMMAND_PREFIX_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'prefix [prefix]')}
        ${argument('prefix')} New prefix (optional)
      `,
      COMMAND_PREFIX_RESPONSE_MODIFIED: (prefix: string) => `The prefix has been modified to \`${prefix}\`.`,
      COMMAND_PREFIX_RESPONSE_IDENTICAL: 'The old and new prefixes are identical.',
      COMMAND_PREFIX_RESPONSE_RESET: (prefix: string) => `The prefix has been reset to \`${prefix}\`.`,
      COMMAND_PREFIX_RESPONSE_ERROR: 'An error occured while saving the new prefix configuration.',

      // LOCALE Command
      COMMAND_LOCALE_DESCRIPTION_SHORT: 'Modifies the language for the current guild.',
      COMMAND_LOCALE_DESCRIPTION_EXTENDED: stripIndent`
        ${oneLine`
          This command allows modifying the language used by the bot in this guild.
          The chosen language must be valid and exists among the bot's translations.
        `},
        Available languages for now are:
        - ${argument('fr')} French
        - ${argument('en')} English (partially translated)
      `,
      COMMAND_LOCALE_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Change the current language to English:
        ${usage(prefix, 'locale en')}
        Reset the language to its default value:
        ${usage(prefix, 'locale')}
      `,
      COMMAND_LOCALE_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'locale [language]')}
        ${argument('language')} Code (two letters) of the language to use (optional)
      `,
      COMMAND_LOCALE_RESPONSE_MODIFIED: (locale: string) => `The language has been set to ${locale}.`,
      COMMAND_LOCALE_RESPONSE_IDENTICAL: (locale: string) => `The current language is already ${locale}.`,
      COMMAND_LOCALE_RESPONSE_RESET: (locale: string) => `The language has been reset to ${locale}.`,
      COMMAND_LOCALE_RESPONSE_ERROR: 'An error occured while saving the new language configuration.',
      COMMAND_LOCALE_RESPONSE_UNKNOWN: (locale: string) => `The language \`${locale}\` is invalid or not available.`,

      // COLOR Command
      COMMAND_COLOR_DESCRIPTION_SHORT: 'Change the color used for embeds\' borders in this guild.',
      COMMAND_COLOR_DESCRIPTION_EXTENDED: oneLine`
        This command allows modifying the color of the border of the embeds
        generated by the bot in this guild.
        The color must be given in the hexadecimal format (i.e. \`#E56703\`).
      `,
      COMMAND_COLOR_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Switch to blue:
        ${usage(prefix, 'color #035afc')}
        Reset the color to its default value:
        ${usage(prefix, 'color')}
      `,
      COMMAND_COLOR_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'color [color]')}
        ${argument('color')} New color (optional)
      `,
      COMMAND_COLOR_RESPONSE_MODIFIED: (color: string) => `The embed color has been modified to \`${color}\`.`,
      COMMAND_COLOR_RESPONSE_IDENTICAL: 'The old and new embed color are identical.',
      COMMAND_COLOR_RESPONSE_RESET: (color: string) => `The embed color has been reset to \`${color}\`.`,
      COMMAND_COLOR_RESPONSE_ERROR: 'An error occured while saving the new color configuration.',

      // INVITE Command
      COMMAND_INVITE_DESCRIPTION_SHORT: 'Generates an invite to add the bot to another Discord guild.',
      COMMAND_INVITE_DESCRIPTION_EXTENDED: oneLine`
        Generates an invite link that allows adding this bot to another guild.
        The bot's permissions are computed based on the required rights necessary to run the available commands.
        The same link can also be used to update the permission of the bot in this guild.
        (it is unnecessary to kick the bot from this guild beforehand). 
      `,
      COMMAND_INVITE_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Generate the bot's invite link:
        ${usage(prefix, 'invite')}
      `,
      COMMAND_INVITE_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'invite')}
      `,
      COMMAND_INVITE_RESPONSE_NOLINK: 'Cannot generate the invite link, please try again later.',
      COMMAND_INVITE_RESPONSE_TITLE: (clientname: string) => `Invite ${clientname} in your Discord guild`,
      COMMAND_INVITE_RESPONSE_FOOTER: oneLine`
        The above link was generated with the minimum permissions required for this bot to work.
        All permissions might not be suitable for all guilds, so do not hesitate to uncheck unwanted permissions.
        If you try to run a command with missing permissions, the bot will tell you.
      `,

      // HELP Command
      COMMAND_HELP_DESCRIPTION_SHORT: 'Displays help about commands.',
      COMMAND_HELP_DESCRIPTION_EXTENDED: oneLine`
        The following commands are available to you. They were selected based on your permissions
        in the guild in which you ran the help command.
        Use \`<prefix>help <command>\` for more information on a specific command.
      `,
      COMMAND_HELP_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Display a generic help message:
        ${usage(prefix, 'help')}
        Display extended help for the \`${prefix}ping\` command:
        ${usage(prefix, 'help ping')}
      `,
      COMMAND_HELP_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'help [command]')}
        ${argument('command')} Name of a command to display the extended help for (optional)
      `,
      COMMAND_HELP_CATEGORY_SETTINGS: 'Settings',
      COMMAND_HELP_CATEGORY_UTILS: 'Utils',
      COMMAND_HELP_CATEGORY_DOFUS: 'Dofus',
      COMMAND_HELP_CATEGORY_GAMES: 'Minigames',
      COMMAND_HELP_CATEGORY_MISC: 'Miscellaneous',
      COMMAND_HELP_RESPONSE_FIELD_TITLE_USAGE: 'Usage',
      COMMAND_HELP_RESPONSE_FIELD_TITLE_EXAMPLE: 'Examples',
      COMMAND_HELP_RESPONSE_FIELD_TITLE_ALIASES: 'Aliases',
      COMMAND_HELP_RESPONSE_FIELD_NO_DESCRIPTION: 'No description for this command.',
      COMMAND_HELP_RESPONSE_FIELD_NO_EXAMPLE: 'No example for this command.',
      COMMAND_HELP_RESPONSE_FIELD_NO_USAGE: 'No usage definition for this command.',
      COMMAND_HELP_RESPONSE_FIELD_NO_ALIAS: 'no alias for this command.',
      COMMAND_HELP_RESPONSE_TITLE: 'Available Commands',
      COMMAND_HELP_RESPONSE_DM: 'Help about commands has been sent to your DMs.',
      COMMAND_HELP_RESPONSE_FROMGUILD: (guildname: string) => `Help asked in ${guildname}`,
      COMMAND_HELP_RESPONSE_ERROR: 'An error occured while fetching help.',

      // ECHO Command
      COMMAND_ECHO_DESCRIPTION_SHORT: 'Repeats a message.',
      COMMAND_ECHO_DESCRIPTION_EXTENDED: oneLine`
        Resends the content of a message in a text channel in the same guild.
        It is possible to join a single file or image.
      `,
      COMMAND_ECHO_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Send a message in the '\#test' channel:
        ${usage(prefix, 'echo #test <message>')}
        Send a message in the current channel:
        ${usage(prefix, 'echo <message>')}
        Send a message in the '\#general' channel and join an image:
        ${usage(prefix, 'echo #general file:https://www.thissitedoesnotexist.com/image.jpg <message>')}
      `,
      COMMAND_ECHO_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'echo [channel] [--file url] [message]')}
        ${argument('channel')} *Mention* of the channel to which the message should be copied (optional)
        ${argument('--file url')} \`--file\ followed by the url of the file to join (optional)
        ${argument('message')} Content to repeat (optional)
      `,
      COMMAND_ECHO_RESPONSE_NO_CONTENT: 'Please provide some text to echo.',
      COMMAND_ECHO_RESPONSE_SENT: (channel: string) => `Message sent to the channel \#${channel}`,

      // ALMANAX Command
      COMMAND_ALMANAX_DESCRIPTION_SHORT: 'Fetches the almanax of the day.',
      COMMAND_ALMANAX_DESCRIPTION_EXTENDED: stripIndent`
        ${oneLine`
          Displays details for the almanax of the day, its bonuses and its offerings to bring to the temple
          in order to complete the daily quest. A more detailed version can also be displayed to include background information.
        `}
        ${oneLine`
          The almanax for the current date is displayed by default, but almanaxes for other dates can also be queried.
        `}
      `,
      COMMAND_ALMANAX_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Fetch today's almanax:
        ${usage(prefix, 'almanax')}
        Display the almanx for April 02:
        ${usage(prefix, 'almanax 02/04')}
        Display the almanax from 3 days ago:
        ${usage(prefix, 'almanax -3')}
        display details of the almanax for next week:
        ${usage(prefix, 'almanax details +7')}
      `,
      COMMAND_ALMANAX_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'almanax [--detail] [date|offset]')}
        ${argument('--detail')} Display the detailed version (optional)
        ${argument('date')} Date for the almanax to fetch (optional)
        ${argument('offset')} Number of days to add/substract to the current date (optional)
      `,
      COMMAND_ALMANAX_RESPONSE_SCRAPE_ERROR: 'Cannot fetch the almanax for now',
      COMMAND_ALMANAX_RESPONSE_DATE_ERROR: (input: string) => `Value \`${input}\` is not a valid date.`,
      COMMAND_ALMANAX_RESPONSE_ALMANAX: (day: string, month: string) => `Almanax for ${day} ${month}`,
      COMMAND_ALMANAX_RESPONSE_DESCRIPTION: 'Meridian Effect',

      // SET Command
      COMMAND_SET_DESCRIPTION_SHORT: 'Assigns a value to a parameter.',
      COMMAND_SET_DESCRIPTION_EXTENDED: stripIndent`
        Configures this guild to enable or disable features of the bot. Multiple keys may be configured
        at once, but at least one key must be set.
        A value containing white-spaces must be enclosed between quotes.
      `,
      COMMAND_SET_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Enables auto-almanax in the '\#almanax' channel:
        ${usage(prefix, 'set almanax \#almanax')}
        Set the default server as Oto Mustam:
        ${usage(prefix, 'set server "oto mustam"')}
      `,
      COMMAND_SET_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'set <key> <value> [<key> <value>,...]')}
        ${argument('almanax')} Enables automatically fetching the almanax and sends it to the configured channel (optional)
        ${argument('twitter')} Enables fetching tweets and sends them in the configured channel (optional)
        ${argument('server')} Configures the Dofus server to use by default in commands (optional)
      `,
      COMMAND_SET_RESPONSE_PAIR: (key: string, value?: string) => `${key} → ${value || 'None'}`,
      COMMAND_SET_RESPONSE_MODIFIED: (pairs: string[]) => stripIndent`
        The following ${pairs.length > 1 ? 'keys were' : 'key was'} updated:
        ${code(pairs.join('\n'))}
      `,
      COMMAND_SET_RESPONSE_NO_KEYS: 'You need to provide at least on key-value pair to configure.',
      COMMAND_SET_RESPONSE_INVALID_PAIRS: 'Different number of keys and values.',
      COMMAND_SET_RESPONSE_INVALID_VALUES: (keys: string[]) => stripIndent`
        The following ${keys.length > 1 ? 'keys were' : 'key was'} provided an incorrect value:
        ${code(keys.join('\n'))}
      `,

      // GET Command
      COMMAND_GET_DESCRIPTION_SHORT: 'Display the value of a parameter.',
      COMMAND_GET_DESCRIPTION_EXTENDED: stripIndent`
        Display values assigned to configuration parameters.
        Values are displayed for the current server only.
      `,
      COMMAND_GET_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Display the channel to which the almanax will be sent:
        ${usage(prefix, 'get almanax')}
        Display all configured parameters:
        ${usage(prefix, 'get')}
      `,
      COMMAND_GET_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'get <key> [<key>,...]')}
        ${argument('almanax')} Channel to which the almanax will be sent (optional)
        ${argument('twitter')} Channel to which tweets will be sent (optional)
        ${argument('server')} Dofus server ti use by default with other commands (optional)
      `,
      COMMAND_GET_RESPONSE_PAIR: (key: string, value?: string) => `${key} → ${value || 'Aucun'}`,
      COMMAND_GET_RESPONSE_PAIRS: (pairs: string[]) => stripIndent`
        The following keys are configured:
        ${code(pairs.join('\n'))}
      `,
      COMMAND_GET_RESPONSE_INVALID_KEYS: (keys: string[]) => stripIndent`
        The following keys you requested are invalid, please check them and try again:
        ${code(keys.join('\n'))}
      `,
      COMMAND_GET_RESPONSE_NO_KEYS: 'No keys to display.',
      COMMAND_GET_RESPONSE_ERROR: 'An error occured while executing the command',

      // PORTAL Command
      COMMAND_PORTAL_RESPONSE_NODATA: (server: { id: string; name: string }) => `No data available for server ${server.name}.`,
      COMMAND_PORTAL_RESPONSE_TO: (dimension: string) => `Portal to ${dimension}`,
      COMMAND_PORTAL_RESPONSE_CYCLE: (cycle: string) => `Modificator : ${cycle}`,
      COMMAND_PORTAL_REPONSE_POSITION: 'Last Known Position',
      COMMAND_PORTAL_REPONSE_POSITION_UNKNOWN: 'Unknown position',
      COMMAND_PORTAL_REPONSE_USES: 'Usages',
      COMMAND_PORTAL_RESPONSE_USES_REMAINING: (uses: string) => `${uses} usages remaining`,
      COMMAND_PORTAL_RESPONSE_UPDATED: (time: string, server: string) => `Updated ${time} ago for the ${server} server.`,
      COMMAND_PORTAL_DESCRIPTION_SHORT: 'Display the position of a portal.',
      COMMAND_PORTAL_DESCRIPTION_EXTENDED: stripIndent`
        Fetches the position of a portal for the guild's configured server, or for a specific server.

        Positions are fetched in real-time from [Dofus-Portals](https://dofus-portals.fr/).

        Currently, portals information is only available in French due to the limitations of the source website.
      `,
      COMMAND_PORTAL_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Display all portals:
        ${usage(prefix, 'portals')}
        Display the position of the portal to Xelorium:
        ${usage(prefix, 'portals xel')}
        Display the position of the portal to Ecaflipus on the Echo server:
        ${usage(prefix, 'portals xel echo')}
      `,
      COMMAND_PORTAL_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'portal [dimension] [server]')}
        ${argument('dimension')} Dimension to search for a portal to (optional)
        ${argument('serveur')} Server for which to search a portal (optional)
      `,
      COMMAND_PORTAL_RESPONSE_NOSERVER: 'No Dofus server was specified, or its name is incorrect.',

      // JOB Command
      COMMAND_JOB_RESPONSE_JOB_ALCHEMIST: 'Alchemist',
      COMMAND_JOB_RESPONSE_JOB_JEWELLER: 'Jeweller',
      COMMAND_JOB_RESPONSE_JOB_HANDYMAN: 'Handyman',
      COMMAND_JOB_RESPONSE_JOB_LUMBERJACK: 'Lumberjack',
      COMMAND_JOB_RESPONSE_JOB_HUNTER: 'Hunter',
      COMMAND_JOB_RESPONSE_JOB_SHOEMAGUS: 'Shoemagus',
      COMMAND_JOB_RESPONSE_JOB_SHOEMAKER: 'Shoemaker',
      COMMAND_JOB_RESPONSE_JOB_COSTUMAGUS: 'Costumagus',
      COMMAND_JOB_RESPONSE_JOB_CRAFTMAGUS: 'Craftmagus',
      COMMAND_JOB_RESPONSE_JOB_ARTIFICER: 'Artificer',
      COMMAND_JOB_RESPONSE_JOB_SMITHMAGUS: 'Smithmagus',
      COMMAND_JOB_RESPONSE_JOB_SMITH: 'Smith',
      COMMAND_JOB_RESPONSE_JOB_JEWELMAGUS: 'Jewelmagus',
      COMMAND_JOB_RESPONSE_JOB_MINER: 'Miner',
      COMMAND_JOB_RESPONSE_JOB_FARMER: 'Farmer',
      COMMAND_JOB_RESPONSE_JOB_FISHERMAN: 'Fisherman',
      COMMAND_JOB_RESPONSE_JOB_CARVMAGUS: 'Carvmagus',
      COMMAND_JOB_RESPONSE_JOB_CARVER: 'Carver',
      COMMAND_JOB_RESPONSE_JOB_TAILOR: 'Tailor',
      COMMAND_JOB_RESPONSE_NOJOBS: (member: string) => `There are no jobs referenced for ${member} yet.`,
      COMMAND_JOB_RESPONSE_NOJOB: (member: string, job: string) => `${member} does not have the job ${job} yet.`,
      COMMAND_JOB_RESPONSE_NOBODY: (job: string) => `Nobody has the job ${job}.`,
      COMMAND_JOB_RESPONSE_TITLE_ALL: 'Jobs',
      COMMAND_JOB_RESPONSE_TITLE_SINGLE: 'Job',
      COMMAND_JOBS_RESPONSE_INVALID_COMBINATION: (args: Record<string, string | number>) => stripIndent`
        The following combination of options cannot be used:
        ${code(Object.entries(args).map(([key, value]) => `${key} → ${value}`).join('\n'))}
      `,
      COMMAND_JOB_DESCRIPTION_SHORT: 'Information about members\' jobs.',
      COMMAND_JOB_DESCRIPTION_EXTENDED: oneLine`
        Allow referencing the level of self-owned jobs or displaying levels of other
        guild members.
      `,
      COMMAND_JOB_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Indicate that 'Farmer' job's level is 125:
        ${usage(prefix, 'job farmer 100')}
        Check the level of the 'Smith' job of another member:
        ${usage(prefix, 'job smith @Member')}
        Check all jobs' level for a member:
        ${usage(prefix, 'job @Member')}
      `,
      COMMAND_JOB_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'job [job] [level] [member]')}
        ${argument('job')} Job to display or update (optional)
        ${argument('level')} New level for a job to update (optionnel)
        ${argument('membre')} Mention of a member to display the jobs of (optional)
      `,
      COMMAND_JOBS_ARGUMENTS_LEVEL_IGNORED: 'A level was provided without a job name, it will be ignored.',
      COMMAND_JOBS_ARGUMENTS_UNKNOWN: (args: (string | number)[]) => stripIndent`
        The following options could not be parsed:
        ${code(args.join('\n'))}
      `,

      // MONIT Command
      COMMAND_MONIT_DESCRIPTION_SHORT: 'Statistics on the bot.',
      COMMAND_MONIT_DESCRIPTION_EXTENDED: oneLine`
        Provide statistics about the client and its processes.

        Includes information about the client's hardware resources consulption and its uptime.
      `,
      COMMAND_MONIT_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Get detailed statistics:
        ${usage(prefix, 'monit')}
      `,
      COMMAND_MONIT_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'monit')}
      `,
      COMMAND_MONIT_RESPONSE_TITLE: (name: string, version: string) => oneLine`
        ${name} [v${version}]
      `,
      COMMAND_MONIT_RESPONSE_ARCH_TITLE: 'Architecture',
      COMMAND_MONIT_RESPONSE_ARCH_VALUE: (version: string, platform: string, arch: string) => code(`NodeJS ${version} [${platform} (${arch})]`),
      COMMAND_MONIT_RESPONSE_PROCESS_TITLE: 'Process',
      COMMAND_MONIT_RESPONSE_PROCESS_VALUE: (name: string, pid: number) => {
        const lengths = { name: name.length, pid: pid.toString().length };
        const padding = Math.max(lengths.name, lengths.pid) + 1;
        return code(
          stripIndent`
            Name: ${' '.repeat(padding - lengths.name)} ${name}
            PID:  ${' '.repeat(padding - lengths.pid)} ${pid}
          `
        );
      },
      COMMAND_MONIT_RESPONSE_RESOURCES_TITLE: 'Resources',
      COMMAND_MONIT_RESPONSE_RESOURCES_VALUE: (cpu: string, rss: string) => {
        const padding = Math.max(cpu.length, rss.length) + 1;
        return code(
          stripIndent`
            CPU:    ${' '.repeat(padding - cpu.length)}  ${cpu} %
            Memory: ${' '.repeat(padding - rss.length)} ${rss} MB
          `
        );
      },
      COMMAND_MONIT_RESPONSE_DISCORD_TITLE: 'Discord',
      COMMAND_MONIT_RESPONSE_DISCORD_VALUE: (heartbeat: number, shards: number) => {
        const lengths = { hb: heartbeat.toString().length, shards: shards.toString().length };
        const padding = Math.max(lengths.hb, lengths.shards) + 1;
        return code(
          stripIndent`
            Latency: ${' '.repeat(padding - lengths.hb)} ${heartbeat} ms
            Shards:  ${' '.repeat(padding - lengths.shards)}    ${shards}
          `
        );
      },
      COMMAND_MONIT_RESPONSE_UPTIME: (uptime: string) => `Online for ${uptime}`,

      // DICE Command
      COMMAND_DICE_DESCRIPTION_SHORT: 'Dice roll.',
      COMMAND_DICE_DESCRIPTION_EXTENDED: oneLine`
        Roll one or more dice with a variable number of faces and sneds back the total obtained score.
      `,
      COMMAND_DICE_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Roll a single 6-faced dice:
        ${usage(prefix, 'roll')}
        Roll 2 dices with 2 faces each:
        ${usage(prefix, '2d100')}
      `,
      COMMAND_DICE_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'roll [rolls]d<faces>')}
        ${argument('rolls')} Amount of rolls to run (optional)
        ${argument('faces')} Amount of faces on each dice
      `,
      COMMAND_DICE_ERROR_ROLLS: (max: number) => `The amount of rolls is too high. The maximum allowed is ${formatNumber(max, ',')}.`,
      COMMAND_DICE_ERROR_SIZE: (max: number) => `The amount of rolls is too high. The maximum allowed is ${formatNumber(max, ',')}.`,
      COMMAND_DICE_RESPONSE_EXPLAIN: (rolls: number, faces: number) => `🎲 Rolling ${formatNumber(rolls, ',')} ${formatNumber(faces, ',')}-faced dice${rolls > 1 ? 's' : ''}`,
      COMMAND_DICE_RESPONSE_TOTAL: (total: number) => `Score: ${formatNumber(total, ',')}`,

      // POLL Command
      COMMAND_POLL_DESCRIPTION_SHORT: 'Polls.',
      COMMAND_POLL_DESCRIPTION_EXTENDED: oneLine`
        Create a poll and collect responses from users.
        Polls can be set to accept one single vote per user, or multiple.
        The first line of text in the message will be used as the poll question.
        Each subsequent line will be used as a single proposition.
        Use \`Shift+Enter\` to insert a new line in your message.
      `,
      COMMAND_POLL_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Create a poll open for the next 24 hours:
        ${usage(prefix, 'poll Question ?\nAnswer 1\nAnswer 2')}
        Create a poll open for the next 10 days:
        ${usage(prefix, 'poll time:10d Question ?\nAnswer 1\nAnswer 2')}
        Create a poll to which responses are "Yes" and "No" and on which users can only select one answer:
        ${usage(prefix, 'poll multi:false Question ?')}
      `,
      COMMAND_POLL_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'poll <question> [answer 1, answer 2, [...]] [--time <duration>]')}
        ${argument('question')} Title of the poll
        ${argument('answers')} Propositions for the poll: either one, either 2 or more (optional)
        ${argument('time')} Duration of the poll, number followed by a suffixe (d = days, h = hours, m = minutes)
        ${argument('multi')} Whether the user can vote for multiple answers at once ('yes' ou 'no')
      `,
      COMMAND_POLL_RESPONSE_NO_TITLE: 'No question were asked.',
      COMMAND_POLL_RESPONSE_NOT_ENOUGH_PROPOSITIONS: 'A poll cannot have a songle proposition.',
      COMMAND_POLL_RESPONSE_PROPOSITION_TOO_LONG: 'One or more propositions are too long (max. 96 characters allowed).',
      COMMAND_POLL_RESPONSE_TIME_TOO_LOW: 'The time to automatic closing cannot be lesser than 1 minute.',
      COMMAND_POLL_RESPONSE_TITLE: (title: string) => `Poll : ${title}`,
      COMMAND_POLL_RESPONSE_RESULTS: (title: string) => `Results: ${title}`,
      COMMAND_POLL_RESPONSE_FOOTER: (reactions: string[], time: string) => stripIndent`
        React to this message with ${reactions.slice(1, -1).join(', ')} or ${reactions[reactions.length - 1]} to vote.
        The creator of the poll can react with ${reactions[0]} to close the poll immediately.
        The poll will be closed automatically on ${time}.
      `,
      COMMAND_POLL_RESPONSE_CLOSED_FOOTER: 'Click on the graph to zoom in.',

      // REMINDER Command
      COMMAND_REMIND_DESCRIPTION_SHORT: 'Reminder.',
      COMMAND_REMIND_DESCRIPTION_EXTENDED: oneLine`
        Send a reminder with a custom message after an amount of time has passed.
      `,
      COMMAND_REMIND_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Sends a reminder containing 'Test' in 24 hours:
        ${usage(prefix, 'remind 1d Test')}
      `,
      COMMAND_REMIND_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'remind [duration] <content>')}
        ${argument('duration')} Duration after which the reminder will be sent, number followed by a suffix (d = days, h = hours, m = minutes)
        ${argument('content')} Content to send in the reminder
      `,
      COMMAND_REMIND_RESPONSE_NO_CONTENT: 'The reminder requires content to send.',
      COMMAND_REMIND_RESPONSE_TIME_TOO_LOW: 'The time before sending the reminder cannot be lesser than 1 minute.',
      COMMAND_REMIND_RESPONSE_SUCCESS: (time: string) => `A reminder will be sent in ${time}`,
      COMMAND_REMIND_RESPONSE_PROCESSED: (content: string, author: string) => `${author} **Reminder:** ${content}`,

      // ABOUT Command
      COMMAND_ABOUT_DESCRIPTION_SHORT: 'About this bot.',
      COMMAND_ABOUT_DESCRIPTION_EXTENDED: 'Displays information about the client and its purpose.',
      COMMAND_ABOUT_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Display information about this client:
        ${usage(prefix, 'about')}
      `,
      COMMAND_ABOUT_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'about')}
      `,
      COMMAND_ABOUT_RESPONSE_TITLE: (name: string) => `About ${name}`.toUpperCase(),
      COMMAND_ABOUT_RESPONSE_DESCRIPTION: (name: string, url: string) => stripIndent`
        ${oneLine`
          [${name}](${url}) is a semi-generic-purpose Discord bot aimed at facilitating the management
          of Dofus guilds by providing a suite of tools and commands to its users.
        `}
      `,
      COMMAND_ABOUT_RESPONSE_FEATURES_TITLE: 'Features',
      COMMAND_ABOUT_RESPONSE_FEATURES_CONTENT: stripIndent`
        \u2022 Customize the prefix and colors of the bot
        \u2022 Benefit from a multilingual experience
        \u2022 Receive tweet directly from Ankama
        \u2022 Display the almanax of the day automatically
        \u2022 Find portals position thanks to [Dofus-Portals](https://dofus-portals.fr/)
        \u2022 List and share your jobs with other guild members
        \u2022 Join events and minigames on Discord
        \u2022 Create polls, setup automatic reminders
        \u2022 And many more...
      `,
      COMMAND_ABOUT_RESPONSE_INVITE_TITLE: 'Invite me to your server',
      COMMAND_ABOUT_RESPONSE_INVITE_CONTENT: (invite: string) => oneLine`
        You can invite me to any Discord guild using the following [link](${invite}).
      `,
      COMMAND_ABOUT_RESPONSE_SUPPORT_TITLE: 'Would you buy me a coffee?',
      COMMAND_ABOUT_RESPONSE_SUPPORT_CONTENT: oneLine`
        Using this bot is free and will remain that way forever. However, making it
        work costs both time and money to its author...
        Do you like this project?
        Why not show your support with a small [donation](https://www.paypal.com/donate?hosted_button_id=2XHYFQDDDNT84)? :heart:

      `,
      COMMAND_ABOUT_RESPONSE_UPTIME: (version: string, uptime: string, author: string) => oneLine`
        Version ${version}
        \u2022 Online for ${uptime}
        \u2022 \u00A9 ${new Date().getFullYear()} ${author}
      `
    };
  }

}
