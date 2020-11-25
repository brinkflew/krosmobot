import { oneLine } from 'common-tags';
import { Locale } from '@/structures';

export default class FrenchLocale extends Locale {
  constructor() {
    super('fr');

    this.strings = {
      // Misc.
      DEFAULT: (key) => `${key} n'a pas encore été traduit en '${this.language.toUpperCase()}'.`,
      DEFAULT_LANGUAGE: 'Langue par défaut.',

      // Languages
      LANG_EN: 'Anglais',
      LANG_FR: 'Français',

      // PING Command
      COMMAND_PING_DESCRIPTION: oneLine`
        Vérifie la latence entre l'utilisateur et le bot, ainsi qu'entre le bot
        et les serveurs de Discord.
      `,
      COMMAND_PING_RESPONSE_TITLE: 'Pong !',
      COMMAND_PING_RESPONSE_RTT: 'Round-Trip Time',
      COMMAND_PING_RESPONSE_HEARTBEAT: 'Heartbeat',

      // PREFIX Command
      COMMAND_PREFIX_RESPONSE_MODIFIED: (prefix) => `Le préfixe a été changé en \`${prefix}\`.`,
      COMMAND_PREFIX_RESPONSE_IDENTICAL: 'L\'ancien et le nouveau préfixes sont identiques.',
      COMMAND_PREFIX_RESPONSE_RESET: (prefix) => `Le préfixe a été réinitialisé à \`${prefix}\`.`,
      COMMAND_PREFIX_RESPONSE_ERROR: 'Une erreur est survenue au moment de sauvegarder le nouveau préfixe.',
      
      // LOCALE Command
      COMMAND_LOCALE_RESPONSE_MODIFIED: (locale) => `La langue a été changée en ${locale}.`,
      COMMAND_LOCALE_RESPONSE_IDENTICAL: (locale) => `La langue actuelle est déjà ${locale}.`,
      COMMAND_LOCALE_RESPONSE_RESET: (locale) => `La langue a été réinitialisée à ${locale}.`,
      COMMAND_LOCALE_RESPONSE_ERROR: 'Une erreur est survenue au moment de sauvegarder la nouvelle langue.',
      COMMAND_LOCALE_RESPONSE_UNKNOWN: (locale) => `La langue \`${locale}\` est invalide ou n'existe pas.`,
    };
  }
}
