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

      // COLOR Command
      COMMAND_COLOR_RESPONSE_MODIFIED: (color) => `La couleur de bordure des intégrations a été changée en \`${color}\`.`,
      COMMAND_COLOR_RESPONSE_IDENTICAL: 'L\'ancienne et la nouvelle couleur de bordure des intégrations sont identiques.',
      COMMAND_COLOR_RESPONSE_RESET: (color) => `La couleur de bordure des intégrations a été réinitialisée en \`${color}\`.`,
      COMMAND_COLOR_RESPONSE_ERROR: 'Une erreur est survenue au moment de sauvegarder la nouvelle couleur de bordure des intégrations.',
      
      // INVITE Command
      COMMAND_INVITE_RESPONSE_NOLINK: 'Impossible de générer l\'invitation. Merc de réessayer plus tard.',
      COMMAND_INVITE_RESPONSE_TITLE: (clientname) => `Ajoutez ${clientname} à votre serveur Discord`,
      COMMAND_INVITE_RESPONSE_FOOTER: oneLine`
        Le lien ci-dessus a été généré avec les permissions minimum requises pour utiliser chaque commande sur ce serveur.
        Toutes les permissions peuvent ne pas être correctes pour chaque serveur, donc n'hésitez pas à décocher certaines cases.
        Si vous essayez de lancer une commande qui necessite de plus amples permissions, le bot vous le fera savoir.
      `,
    };
  }
}
