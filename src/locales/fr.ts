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
      COMMAND_HELP_CATEGORY_DOFUS : 'Commandes de Dofus',
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

      // ECHO Command
      COMMAND_ECHO_DESCRIPTION_SHORT: 'Répète un message.',
      COMMAND_ECHO_DESCRIPTION_EXTENDED: oneLine`
        Renvoie le contenu d'un message à l'identique dans un salon du même serveur au choix.
        Il est également possible d'y joindre un fichier ou une image.
      `,
      COMMAND_ECHO_DESCRIPTION_EXAMPLE: (prefix) => stripIndent`
        Envoyer un message dans le salon '\#test' :
        ${usage(prefix, 'echo #test <message>')}
        Envoyer un message dans le salon courant :
        ${usage(prefix, 'echo <message>')}
        Envoyer un message dans le salon '\#general' et y joindre une image :
        ${usage(prefix, 'echo #general file:https://www.cesitenexistepas.com/image.jpg <message>')}
      `,
      COMMAND_ECHO_DESCRIPTION_USAGE: (prefix) => stripIndent`
        ${usage(prefix, 'echo [salon] [file:url] [message]')}
        ${argument('salon')} *Mention* du salon dans lequel envoyer le message (optionnel)
        ${argument('file:url')} \`file:\ suivit de l'URL d'un fichier ou d'une image à joindre (optionnel)
        ${argument('message')} Contenu du message à envoyer (optionnel)
      `,
      COMMAND_ECHO_RESPONSE_SENT: (channel) => `Message envoyé dans le channel \#${channel}`,

      // ALMANAX Command
      COMMAND_ALMANAX_DESCRIPTION_SHORT: 'Récupères l\'almanax du jour.',
      COMMAND_ALMANAX_DESCRIPTION_EXTENDED: stripIndent`
        ${oneLine`
          Affiche les détails de l'almanax du jour, ses bonus et l'offrande à apporter au temple afin d'accomplir
          la quête journalière. Il est possible d'afficher une version plus détaillée (Effet Méryde) en plus de l'offrande
          et du bonus.
        `}
        ${oneLine`
          Par défault, l'almanax affiché est celui du jour actuel, mais il est également possible d'accéder
          à l'almanax d'une autre date.
        `}
      `,
      COMMAND_ALMANAX_DESCRIPTION_EXAMPLE: (prefix) => stripIndent`
        Récupérer l'almanax d'aujourd'hui :
        ${usage(prefix, 'almanax')}
        Afficher l'almanax du 2 avril :
        ${usage(prefix, 'almanax 02/04')}
        Afficher l'almanax d'il y a trois jours :
        ${usage(prefix, 'almanax -3')}
        Afficher plus de détails pour l'almanax de la semaine prochaine :
        ${usage(prefix, 'almanax details +7')}
      `,
      COMMAND_ALMANAX_DESCRIPTION_USAGE: (prefix) => stripIndent`
        ${usage(prefix, 'almanax [--details] [date|décalage]')}
        ${argument('details')} Affiche une version détaillée (optionnel)
        ${argument('date')} Date de l'almanax à récupérer (optionnel)
        ${argument('décalage')} Nombre de jours à ajouter/retirer à aujourd'hui (optionnel)
      `,
      COMMAND_ALMANAX_RESPONSE_SCRAPE_ERROR: 'Impossible de récupérer l\'Almanax pour le moment...',
      COMMAND_ALMANAX_RESPONSE_DATE_ERROR: (input) => `La valeur \`${input}\` ne correspond pas à une date valide.`,
      COMMAND_ALMANAX_RESPONSE_ALMANAX: (day, month) => `Almanax du ${day} ${month}`,
      COMMAND_ALMANAX_RESPONSE_DESCRIPTION: 'Effet Méryde',

      // SET Command
      COMMAND_SET_DESCRIPTION_SHORT: 'Assigne une valeur à un paramètre.',
      COMMAND_SET_DESCRIPTION_EXTENDED: stripIndent`
        Configure le serveur pour activer ou désactiver des fonctions de ce bot. Plusieurs clés peuvent être
        configurées à la fois, mais au moins une clé doit être indiquée.
      `,
      COMMAND_SET_DESCRIPTION_EXAMPLE: (prefix) => stripIndent`
        Active l'almanax automatique dans le salon '\#almanax' :
        ${usage(prefix, 'set almanax.auto enable almanax.channel \#almanax')}
      `,
      COMMAND_SET_DESCRIPTION_USAGE: (prefix) => stripIndent`
        ${usage(prefix, '<key> <value> [<key> <value>,...]')}
        ${argument('almanax.auto')} Active l'almanax automatique; un salon doit aussi être configuré (optionnel)
        ${argument('almanax.channel')} Force le salon dans lequel l'almanax est envoyé (optionnel)
      `,
      COMMAND_SET_RESPONSE_MODIFIED: (keys) => `Les clés suivantes ont été mises à jour :\n\`${keys.join('`\n`')}\``,
      COMMAND_SET_RESPONSE_ERROR: 'Une erreur est survenu durant l\'exécution de la commande...',
    };
  }
}
