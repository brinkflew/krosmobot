import { oneLine, stripIndent } from 'common-tags';
import { Locale } from '@/structures';
import { usage, argument } from '@/utils';

export default class FrenchLocale extends Locale {
  constructor() {
    super('fr');

    this.strings = {
      // Misc.
      DEFAULT: (key) => `${key} n'a pas encore été traduit en ${this.language.toUpperCase()}.`,
      DEFAULT_LANGUAGE: 'Langue par défaut.',

      // Languages
      LANG_EN: 'Anglais',
      LANG_FR: 'Français',

      // PING Command
      COMMAND_PING_DESCRIPTION_SHORT: 'Latence entre le bot et Discord.',
      COMMAND_PING_DESCRIPTION_EXTENDED: stripIndent`
        ${oneLine`
          Vérifie la latence entre l'utilisateur et le bot, ainsi qu'entre le bot
          et les serveurs de Discord.
        `}
        ${oneLine`
          - Le *Round-Trip Time (RTT)* correspond au temps qu'il faut au bot pour envoyer un message,
          recevoir la confirmation de Discord indiquant qu'il a été posté, et éditer ce même message.
        `}
        ${oneLine`
          - Le *Heartbeat* correspond à la latence entre le bot et les serveurs de Discord.
        `}
      `,
      COMMAND_PING_DESCRIPTION_EXAMPLE: (prefix) => stripIndent`
        Afficher la latence actuelle :
        ${usage(prefix, 'ping')}
      `,
      COMMAND_PING_DESCRIPTION_USAGE: (prefix) => usage(prefix, 'ping'),
      COMMAND_PING_RESPONSE_TITLE: 'Pong !',
      COMMAND_PING_RESPONSE_RTT: 'Round-Trip Time',
      COMMAND_PING_RESPONSE_HEARTBEAT: 'Heartbeat',

      // PREFIX Command
      COMMAND_PREFIX_DESCRIPTION_SHORT: 'Change le préfixe pour ce serveur.',
      COMMAND_PREFIX_DESCRIPTION_EXTENDED: oneLine`
        Cette commande permet de modifier le préfixe utilisé par ce bot sur l'ensemble
        de ce serveur.
        Le préfixe est un caractère ou une suite de caractères (maximum 10) qui, si utilisé
        au début d'un message, indique au bot qu'il s'agit d'une commande à laquelle il doit répondre.
      `,
      COMMAND_PREFIX_DESCRIPTION_EXAMPLE: (prefix) => stripIndent`
        Changer le préfixe actuel en \`$\` :
        ${usage(prefix, 'prefix $')}
        Réinitialiser le préfixe à sa valeur par défaut :
        ${usage(prefix, 'prefix')}
      `,
      COMMAND_PREFIX_DESCRIPTION_USAGE: (prefix) => stripIndent`
        ${usage(prefix, 'prefix [préfixe]')}
        ${argument('préfixe')} Nouveau préfixe (optionnel)
      `,
      COMMAND_PREFIX_RESPONSE_MODIFIED: (prefix) => `Le préfixe a été changé en \`${prefix}\`.`,
      COMMAND_PREFIX_RESPONSE_IDENTICAL: 'L\'ancien et le nouveau préfixes sont identiques.',
      COMMAND_PREFIX_RESPONSE_RESET: (prefix) => `Le préfixe a été réinitialisé à \`${prefix}\`.`,
      COMMAND_PREFIX_RESPONSE_ERROR: 'Une erreur est survenue au moment de sauvegarder le nouveau préfixe.',
      
      // LOCALE Command
      COMMAND_LOCALE_DESCRIPTION_SHORT: 'Change la langue pour ce serveur.',
      COMMAND_LOCALE_DESCRIPTION_EXTENDED: stripIndent`
        ${oneLine`
          Cette commande permet de modifier la langue utilisée par ce bot sur l'ensemble
          de ce serveur. La langue doit être valide et exister dans les traductions du bot.
        `},
        Les langues disponibles actuellement sont :
        - ${argument('fr')} Français
        - ${argument('en')} Anglais (partiellement traduit)
      `,
      COMMAND_LOCALE_DESCRIPTION_EXAMPLE: (prefix) => stripIndent`
        Changer la langue actuelle en anglais :
        ${usage(prefix, 'locale en')}
        Réinitialiser la langue utilisée à sa valeur par défaut :
        ${usage(prefix, 'locale')}
      `,
      COMMAND_LOCALE_DESCRIPTION_USAGE: (prefix) => stripIndent`
        ${usage(prefix, 'locale [langue]')}
        ${argument('langue')} Code (en deux lettres) de la nouvelle langue (optionnel)
      `,
      COMMAND_LOCALE_RESPONSE_MODIFIED: (locale) => `La langue a été changée en ${locale}.`,
      COMMAND_LOCALE_RESPONSE_IDENTICAL: (locale) => `La langue actuelle est déjà ${locale}.`,
      COMMAND_LOCALE_RESPONSE_RESET: (locale) => `La langue a été réinitialisée à ${locale}.`,
      COMMAND_LOCALE_RESPONSE_ERROR: 'Une erreur est survenue au moment de sauvegarder la nouvelle langue.',
      COMMAND_LOCALE_RESPONSE_UNKNOWN: (locale) => `La langue \`${locale}\` est invalide ou n'existe pas.`,

      // COLOR Command
      COMMAND_COLOR_DESCRIPTION_SHORT: 'Change la couleur des intégrations pour ce serveur.',
      COMMAND_COLOR_DESCRIPTION_EXTENDED: oneLine`
        Cette commande permet de modifier la couleur utilisée pour le rendu des intégrations
        générées par ce bot sur l'ensemble de ce serveur.
        La couleur doit être indiquée au format hexadécimal (ex: \`#E56703\`).
      `,
      COMMAND_COLOR_DESCRIPTION_EXAMPLE: (prefix) => stripIndent`
        Changer la couleur actuelle en bleu :
        ${usage(prefix, 'color #035afc')}
        Réinitialiser la couleur à sa valeur par défaut :
        ${usage(prefix, 'color')}
      `,
      COMMAND_COLOR_DESCRIPTION_USAGE: (prefix) => stripIndent`
        ${usage(prefix, 'color [couleur]')}
        ${argument('couleur')} Nouvelle couleur (optionnel)
      `,
      COMMAND_COLOR_RESPONSE_MODIFIED: (color) => `La couleur de bordure des intégrations a été changée en \`${color}\`.`,
      COMMAND_COLOR_RESPONSE_IDENTICAL: 'L\'ancienne et la nouvelle couleur de bordure des intégrations sont identiques.',
      COMMAND_COLOR_RESPONSE_RESET: (color) => `La couleur de bordure des intégrations a été réinitialisée en \`${color}\`.`,
      COMMAND_COLOR_RESPONSE_ERROR: 'Une erreur est survenue au moment de sauvegarder la nouvelle couleur de bordure des intégrations.',
      
      // INVITE Command
      COMMAND_INVITE_DESCRIPTION_SHORT: 'Génère une invitation pour ajouter ce bot à un serveur',
      COMMAND_INVITE_DESCRIPTION_EXTENDED: oneLine`
        Génère un lien pouvant être utilisé pour inviter ce bot sur un nouveau serveur.
        Les permissions du bot sont calculées automatiquement en fonction des prérequis pour exécuter
        les commandes disponibles. Le lien peut aussi être utilisé pour mettre à jour les permissions
        du bot sur ce serveur (il n'est pas necéssaire de retirer les bot du serveur préalablement). 
      `,
      COMMAND_INVITE_DESCRIPTION_EXAMPLE: (prefix) => stripIndent`
        Générer le lien d'invitation du bot :
        ${usage(prefix, 'invite')}
      `,
      COMMAND_INVITE_DESCRIPTION_USAGE: (prefix) => stripIndent`
        ${usage(prefix, 'invite')}
      `,
      COMMAND_INVITE_RESPONSE_NOLINK: 'Impossible de générer l\'invitation. Merc de réessayer plus tard.',
      COMMAND_INVITE_RESPONSE_TITLE: (clientname) => `Ajoutez ${clientname} à votre serveur Discord`,
      COMMAND_INVITE_RESPONSE_FOOTER: oneLine`
        Le lien ci-dessus a été généré avec les permissions minimum requises pour utiliser chaque commande sur ce serveur.
        Toutes les permissions peuvent ne pas être correctes pour chaque serveur, donc n'hésitez pas à décocher certaines cases.
        Si vous essayez de lancer une commande qui necessite de plus amples permissions, le bot vous le fera savoir.
      `,
      
      // HELP Command
      COMMAND_HELP_DESCRIPTION_SHORT: 'Affiche l\'aide des commandes',
      COMMAND_HELP_DESCRIPTION_EXTENDED: oneLine`
        Les commandes suivantes sont à votre disposition. Elles ont été sélectionnées
        sur base de vos droits sur le serveur dans lequel vous avez demandé cette aide.
        Utilisez \`<préfixe>help <commande>\` pour plus d'informations sur une commande spécifique.
      `,
      COMMAND_HELP_DESCRIPTION_EXAMPLE: (prefix) => stripIndent`
        Afficher l'aide générale sur l'ensemble des commandes disponibles :
        ${usage(prefix, 'help')}
        Afficher l'aide étende de la commande \`${prefix}ping\` :
        ${usage(prefix, 'help ping')}
      `,
      COMMAND_HELP_DESCRIPTION_USAGE: (prefix) => stripIndent`
        ${usage(prefix, 'help [commande]')}
        ${argument('commande')} Nom d'une commande pour laquelle afficher l'aide (optionnel)
      `,
      COMMAND_HELP_CATEGORY_SETTINGS: 'Paramètres',
      COMMAND_HELP_CATEGORY_UTILS: 'Commandes Utilitaires',
      COMMAND_HELP_RESPONSE_FIELD_TITLE_USAGE: 'Utilisation',
      COMMAND_HELP_RESPONSE_FIELD_TITLE_EXAMPLE: 'Exemples',
      COMMAND_HELP_RESPONSE_FIELD_TITLE_ALIASES: 'Alias',
      COMMAND_HELP_RESPONSE_FIELD_NO_DESCRIPTION: 'Aucune description pour cette commande.',
      COMMAND_HELP_RESPONSE_FIELD_NO_EXAMPLE: 'Aucun example pour cette commande.',
      COMMAND_HELP_RESPONSE_FIELD_NO_USAGE: 'Pas de définition d\'utilisation de cette commande.',
      COMMAND_HELP_RESPONSE_FIELD_NO_ALIAS: 'Pas d\'alias pour cette commande.',
      COMMAND_HELP_RESPONSE_TITLE: 'Commandes Disponibles',
      COMMAND_HELP_RESPONSE_DM: 'L\'aide des commandes vous a été envoyée par message privé.',
      COMMAND_HELP_RESPONSE_FROMGUILD: (guildname) => `Aide demandée sur ${guildname}`,
      COMMAND_HELP_RESPONSE_ERROR: 'Une erreur est survenue en récupérant l\'aide.',
    };
  }
}
