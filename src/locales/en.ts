import { oneLine } from 'common-tags';
import { Locale } from '@/structures';

export default class EnglishLocale extends Locale {
  constructor() {
    super('en');

    this.strings = {
      // Misc.
      DEFAULT: (key) => `${key} has not been translated to '${this.language.toUpperCase()}' yet.`,
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
      COMMAND_PREFIX_RESPONSE_MODIFIED: (prefix) => `The prefix has been changed to \`${prefix}\`.`,
      COMMAND_PREFIX_RESPONSE_IDENTICAL: 'The old and the new prefixes are identical.',
      COMMAND_PREFIX_RESPONSE_RESET: (prefix) => `The prefix has been reset to \`${prefix}\`.`,
      COMMAND_PREFIX_RESPONSE_ERROR: 'An error occured while saving the new prefix.',
      
      // LOCALE Command
      COMMAND_LOCALE_RESPONSE_MODIFIED: (locale) => `The language has been changed to ${locale}.`,
      COMMAND_LOCALE_RESPONSE_IDENTICAL: 'The old and the new languages are identical.',
      COMMAND_LOCALE_RESPONSE_RESET: (locale) => `The language has been reset to ${locale}.`,
      COMMAND_LOCALE_RESPONSE_ERROR: 'An error occured while saving the new language.',
      COMMAND_LOCALE_RESPONSE_UNKNOWN: (locale) => `The locale \`${locale}\` is invalid or does not exist.`,
    };
  }
}
