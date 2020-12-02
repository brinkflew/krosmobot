/* eslint-disable @typescript-eslint/naming-convention */

import { oneLine, stripIndent } from 'common-tags';
import { Locale } from '@/structures';
import { usage } from '@/utils';

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

      // PING Command
      COMMAND_PING_DESCRIPTION: oneLine`
        Check the latency between the user and the bot, as well as between
        the bot and the discord servers.
      `,
      COMMAND_PING_RESPONSE_TITLE: 'Pong!',
      COMMAND_PING_RESPONSE_RTT: 'Round-Trip Time',
      COMMAND_PING_RESPONSE_HEARTBEAT: 'Heartbeat',

      // PREFIX Command
      COMMAND_PREFIX_RESPONSE_MODIFIED: (prefix: string) => `The prefix has been changed to \`${prefix}\`.`,
      COMMAND_PREFIX_RESPONSE_IDENTICAL: 'The old and the new prefixes are identical.',
      COMMAND_PREFIX_RESPONSE_RESET: (prefix: string) => `The prefix has been reset to \`${prefix}\`.`,
      COMMAND_PREFIX_RESPONSE_ERROR: 'An error occured while saving the new prefix.',

      // LOCALE Command
      COMMAND_LOCALE_RESPONSE_MODIFIED: (locale: string) => `The language has been changed to ${locale}.`,
      COMMAND_LOCALE_RESPONSE_IDENTICAL: (locale: string) => `The current locale is already set to ${locale}.`,
      COMMAND_LOCALE_RESPONSE_RESET: (locale: string) => `The language has been reset to ${locale}.`,
      COMMAND_LOCALE_RESPONSE_ERROR: 'An error occured while saving the new language.',
      COMMAND_LOCALE_RESPONSE_UNKNOWN: (locale: string) => `The locale \`${locale}\` is invalid or does not exist.`,

      // COLOR Command
      COMMAND_COLOR_RESPONSE_MODIFIED: (color: string) => `The embeds' border color has been changed to \`${color}\`.`,
      COMMAND_COLOR_RESPONSE_IDENTICAL: 'The old and the new embeds\' border colors are identical.',
      COMMAND_COLOR_RESPONSE_RESET: (color: string) => `The embeds' border color has been reset to \`${color}\`.`,
      COMMAND_COLOR_RESPONSE_ERROR: 'An error occured while saving the new embeds\' border color.',

      // INVITE Command
      COMMAND_INVITE_RESPONSE_NOLINK: 'Couln\'t generate an invite link for this server. Please try again later.',
      COMMAND_INVITE_RESPONSE_TITLE: (clientname: string) => `Add ${clientname} to your Discord server`,
      COMMAND_INVITE_RESPONSE_FOOTER: oneLine`
        The above link was generated with the minimum permissions required to run all its commands.
        All permissions might not be correct for all servers, hence do not hesitate to uncheck the boxes you don't want.
        If you try to use a command that requires more permissions, the bot will tell you.
      `,

      // HELP Command
      COMMAND_HELP_DESCRIPTION_SHORT: 'Show help about commands',
      COMMAND_HELP_DESCRIPTION_EXTENDED: oneLine`
        The following commands are available to you. They have been selected based on
        your permissions in the guild within which you requested this help.
        Use \`<prefix>help <command>\` to get more information about a specific command.
      `,
      COMMAND_HELP_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Display generic help about the available commands:
        ${usage(prefix, 'help')}
        Show extended help for the \`${prefix}ping\` command:
        ${usage(prefix, 'help ping')}
      `,
      COMMAND_HELP_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'help [command]')}
        \`command\` → Name of a command to display the help for (optional)
      `,
      COMMAND_HELP_CATEGORY_SETTINGS: 'Settings',
      COMMAND_HELP_CATEGORY_UTILS: 'Utility Commands',
      COMMAND_HELP_RESPONSE_FIELD_TITLE_USAGE: 'Usage',
      COMMAND_HELP_RESPONSE_FIELD_TITLE_EXAMPLE: 'Examples',
      COMMAND_HELP_RESPONSE_FIELD_NO_DESCRIPTION: 'No description for this command.',
      COMMAND_HELP_RESPONSE_FIELD_NO_EXAMPLE: 'No examples for this command.',
      COMMAND_HELP_RESPONSE_TITLE: 'Commands Available',
      COMMAND_HELP_RESPONSE_DM: 'Help for commands was sent to you in your DMs.',
      COMMAND_HELP_RESPONSE_FROMGUILD: (guildname: string) => `Help requested from ${guildname}`,
      COMMAND_HELP_RESPONSE_ERROR: 'An error occured while fetching help.'
    };
  }

}
