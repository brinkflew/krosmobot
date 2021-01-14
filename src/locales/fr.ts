/* eslint-disable @typescript-eslint/naming-convention */

import { oneLine, stripIndent } from 'common-tags';
import { Locale } from '@/structures';
import { usage, argument, code } from '@/utils';

export default class FrenchLocale extends Locale {

  public constructor() {
    super('fr');

    this.strings = {
      // Misc.
      DEFAULT: (key: string) => `${key} n'a pas encore été traduit en ${this.language.toUpperCase()}.`,
      DEFAULT_LANGUAGE: 'Langue par défaut.',

      // Languages
      LANG_EN: 'Anglais',
      LANG_FR: 'Français',

      // Message statuses
      MESSAGE_STATUS_SUCCESS: 'Youpie !',
      MESSAGE_STATUS_ERROR: 'Aïe !',
      MESSAGE_STATUS_WARNING: 'Hmmm...',

      // TWITTER Task
      TASK_TWITTER_ORIGINAL_TWEET: 'Ouvrir l\'original',
      TASK_TWITTER_FOOTER: 'Vu sur Twitter',

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
      COMMAND_PING_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Afficher la latence actuelle :
        ${usage(prefix, 'ping')}
      `,
      COMMAND_PING_DESCRIPTION_USAGE: (prefix: string) => usage(prefix, 'ping'),
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
      COMMAND_PREFIX_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Changer le préfixe actuel en \`$\` :
        ${usage(prefix, 'prefix $')}
        Réinitialiser le préfixe à sa valeur par défaut :
        ${usage(prefix, 'prefix')}
      `,
      COMMAND_PREFIX_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'prefix [préfixe]')}
        ${argument('préfixe')} Nouveau préfixe (optionnel)
      `,
      COMMAND_PREFIX_RESPONSE_MODIFIED: (prefix: string) => `Le préfixe a été changé en \`${prefix}\`.`,
      COMMAND_PREFIX_RESPONSE_IDENTICAL: 'L\'ancien et le nouveau préfixes sont identiques.',
      COMMAND_PREFIX_RESPONSE_RESET: (prefix: string) => `Le préfixe a été réinitialisé à \`${prefix}\`.`,
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
      COMMAND_LOCALE_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Changer la langue actuelle en anglais :
        ${usage(prefix, 'locale en')}
        Réinitialiser la langue utilisée à sa valeur par défaut :
        ${usage(prefix, 'locale')}
      `,
      COMMAND_LOCALE_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'locale [langue]')}
        ${argument('langue')} Code (en deux lettres) de la nouvelle langue (optionnel)
      `,
      COMMAND_LOCALE_RESPONSE_MODIFIED: (locale: string) => `La langue a été changée en ${locale}.`,
      COMMAND_LOCALE_RESPONSE_IDENTICAL: (locale: string) => `La langue actuelle est déjà ${locale}.`,
      COMMAND_LOCALE_RESPONSE_RESET: (locale: string) => `La langue a été réinitialisée à ${locale}.`,
      COMMAND_LOCALE_RESPONSE_ERROR: 'Une erreur est survenue au moment de sauvegarder la nouvelle langue.',
      COMMAND_LOCALE_RESPONSE_UNKNOWN: (locale: string) => `La langue \`${locale}\` est invalide ou n'existe pas.`,

      // COLOR Command
      COMMAND_COLOR_DESCRIPTION_SHORT: 'Change la couleur des intégrations pour ce serveur.',
      COMMAND_COLOR_DESCRIPTION_EXTENDED: oneLine`
        Cette commande permet de modifier la couleur utilisée pour le rendu des intégrations
        générées par ce bot sur l'ensemble de ce serveur.
        La couleur doit être indiquée au format hexadécimal (ex: \`#E56703\`).
      `,
      COMMAND_COLOR_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Changer la couleur actuelle en bleu :
        ${usage(prefix, 'color #035afc')}
        Réinitialiser la couleur à sa valeur par défaut :
        ${usage(prefix, 'color')}
      `,
      COMMAND_COLOR_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'color [couleur]')}
        ${argument('couleur')} Nouvelle couleur (optionnel)
      `,
      COMMAND_COLOR_RESPONSE_MODIFIED: (color: string) => `La couleur de bordure des intégrations a été changée en \`${color}\`.`,
      COMMAND_COLOR_RESPONSE_IDENTICAL: 'L\'ancienne et la nouvelle couleur de bordure des intégrations sont identiques.',
      COMMAND_COLOR_RESPONSE_RESET: (color: string) => `La couleur de bordure des intégrations a été réinitialisée en \`${color}\`.`,
      COMMAND_COLOR_RESPONSE_ERROR: 'Une erreur est survenue au moment de sauvegarder la nouvelle couleur de bordure des intégrations.',

      // INVITE Command
      COMMAND_INVITE_DESCRIPTION_SHORT: 'Génère une invitation pour ajouter ce bot à un serveur.',
      COMMAND_INVITE_DESCRIPTION_EXTENDED: oneLine`
        Génère un lien pouvant être utilisé pour inviter ce bot sur un nouveau serveur.
        Les permissions du bot sont calculées automatiquement en fonction des prérequis pour exécuter
        les commandes disponibles. Le lien peut aussi être utilisé pour mettre à jour les permissions
        du bot sur ce serveur (il n'est pas necéssaire de retirer les bot du serveur préalablement). 
      `,
      COMMAND_INVITE_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Générer le lien d'invitation du bot :
        ${usage(prefix, 'invite')}
      `,
      COMMAND_INVITE_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'invite')}
      `,
      COMMAND_INVITE_RESPONSE_NOLINK: 'Impossible de générer l\'invitation. Veuillez réessayer plus tard.',
      COMMAND_INVITE_RESPONSE_TITLE: (clientname: string) => `Ajoutez ${clientname} à votre serveur Discord`,
      COMMAND_INVITE_RESPONSE_FOOTER: oneLine`
        Le lien ci-dessus a été généré avec les permissions minimum requises pour utiliser chaque commande sur ce serveur.
        Toutes les permissions peuvent ne pas être correctes pour chaque serveur, donc n'hésitez pas à décocher certaines cases.
        Si vous essayez de lancer une commande qui necessite de plus amples permissions, le bot vous le fera savoir.
      `,

      // HELP Command
      COMMAND_HELP_DESCRIPTION_SHORT: 'Affiche l\'aide des commandes.',
      COMMAND_HELP_DESCRIPTION_EXTENDED: oneLine`
        Les commandes suivantes sont à votre disposition. Elles ont été sélectionnées
        sur base de vos droits sur le serveur dans lequel vous avez demandé cette aide.
        Utilisez \`<préfixe>help <commande>\` pour plus d'informations sur une commande spécifique.
      `,
      COMMAND_HELP_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Afficher l'aide générale sur l'ensemble des commandes disponibles :
        ${usage(prefix, 'help')}
        Afficher l'aide étende de la commande \`${prefix}ping\` :
        ${usage(prefix, 'help ping')}
      `,
      COMMAND_HELP_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'help [commande]')}
        ${argument('commande')} Nom d'une commande pour laquelle afficher l'aide (optionnel)
      `,
      COMMAND_HELP_CATEGORY_SETTINGS: 'Paramètres',
      COMMAND_HELP_CATEGORY_UTILS: 'Commandes Utilitaires',
      COMMAND_HELP_CATEGORY_DOFUS: 'Commandes de Dofus',
      COMMAND_HELP_RESPONSE_FIELD_TITLE_USAGE: 'Utilisation',
      COMMAND_HELP_RESPONSE_FIELD_TITLE_EXAMPLE: 'Exemples',
      COMMAND_HELP_RESPONSE_FIELD_TITLE_ALIASES: 'Alias',
      COMMAND_HELP_RESPONSE_FIELD_NO_DESCRIPTION: 'Aucune description pour cette commande.',
      COMMAND_HELP_RESPONSE_FIELD_NO_EXAMPLE: 'Aucun example pour cette commande.',
      COMMAND_HELP_RESPONSE_FIELD_NO_USAGE: 'Pas de définition d\'utilisation de cette commande.',
      COMMAND_HELP_RESPONSE_FIELD_NO_ALIAS: 'Pas d\'alias pour cette commande.',
      COMMAND_HELP_RESPONSE_TITLE: 'Commandes Disponibles',
      COMMAND_HELP_RESPONSE_DM: 'L\'aide des commandes vous a été envoyée par message privé.',
      COMMAND_HELP_RESPONSE_FROMGUILD: (guildname: string) => `Aide demandée sur ${guildname}`,
      COMMAND_HELP_RESPONSE_ERROR: 'Une erreur est survenue en récupérant l\'aide.',

      // ECHO Command
      COMMAND_ECHO_DESCRIPTION_SHORT: 'Répète un message.',
      COMMAND_ECHO_DESCRIPTION_EXTENDED: oneLine`
        Renvoie le contenu d'un message à l'identique dans un salon du même serveur au choix.
        Il est également possible d'y joindre un fichier ou une image.
      `,
      COMMAND_ECHO_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Envoyer un message dans le salon '\#test' :
        ${usage(prefix, 'echo #test <message>')}
        Envoyer un message dans le salon courant :
        ${usage(prefix, 'echo <message>')}
        Envoyer un message dans le salon '\#general' et y joindre une image :
        ${usage(prefix, 'echo #general file:https://www.cesitenexistepas.com/image.jpg <message>')}
      `,
      COMMAND_ECHO_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'echo [salon] [file:url] [message]')}
        ${argument('salon')} *Mention* du salon dans lequel envoyer le message (optionnel)
        ${argument('file:url')} \`file:\ suivit de l'URL d'un fichier ou d'une image à joindre (optionnel)
        ${argument('message')} Contenu du message à envoyer (optionnel)
      `,
      COMMAND_ECHO_RESPONSE_SENT: (channel: string) => `Message envoyé dans le channel \#${channel}`,

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
      COMMAND_ALMANAX_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Récupérer l'almanax d'aujourd'hui :
        ${usage(prefix, 'almanax')}
        Afficher l'almanax du 2 avril :
        ${usage(prefix, 'almanax 02/04')}
        Afficher l'almanax d'il y a trois jours :
        ${usage(prefix, 'almanax -3')}
        Afficher plus de détails pour l'almanax de la semaine prochaine :
        ${usage(prefix, 'almanax details +7')}
      `,
      COMMAND_ALMANAX_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'almanax [--details] [date|décalage]')}
        ${argument('details')} Affiche une version détaillée (optionnel)
        ${argument('date')} Date de l'almanax à récupérer (optionnel)
        ${argument('décalage')} Nombre de jours à ajouter/retirer à aujourd'hui (optionnel)
      `,
      COMMAND_ALMANAX_RESPONSE_SCRAPE_ERROR: 'Impossible de récupérer l\'Almanax pour le moment...',
      COMMAND_ALMANAX_RESPONSE_DATE_ERROR: (input: string) => `La valeur \`${input}\` ne correspond pas à une date valide.`,
      COMMAND_ALMANAX_RESPONSE_ALMANAX: (day: string, month: string) => `Almanax du ${day} ${month}`,
      COMMAND_ALMANAX_RESPONSE_DESCRIPTION: 'Effet Méryde',

      // SET Command
      COMMAND_SET_DESCRIPTION_SHORT: 'Assigne une valeur à un paramètre.',
      COMMAND_SET_DESCRIPTION_EXTENDED: stripIndent`
        Configure le serveur pour activer ou désactiver des fonctions de ce bot. Plusieurs clés peuvent être
        configurées à la fois, mais au moins une clé doit être indiquée.
      `,
      COMMAND_SET_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Active l'almanax automatique dans le salon '\#almanax' :
        ${usage(prefix, 'set almanax.auto enable almanax.channel \#almanax')}
      `,
      COMMAND_SET_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'set <key> <value> [<key> <value>,...]')}
        ${argument('almanax.auto')} Active l'almanax automatique; un salon doit aussi être configuré (optionnel)
        ${argument('almanax.channel')} Force le salon dans lequel l'almanax est envoyé (optionnel)
      `,
      COMMAND_SET_RESPONSE_MODIFIED: (keys: string[]) => `Les clés suivantes ont été mises à jour :\n\`${keys.join('`\n`')}\``,
      COMMAND_SET_RESPONSE_ERROR: 'Une erreur est survenue durant l\'exécution de la commande...',

      // PORTAL Command
      COMMAND_PORTAL_RESPONSE_NODATA: 'Pas de données disponnibles pour ce serveur.',
      COMMAND_PORTAL_RESPONSE_TO: (dimension: string) => `Portail vers ${dimension}`,
      COMMAND_PORTAL_RESPONSE_CYCLE: (cycle: string) => `Modificateur : ${cycle}`,
      COMMAND_PORTAL_REPONSE_POSITION: 'Dernière Position Connue',
      COMMAND_PORTAL_REPONSE_POSITION_UNKNOWN: 'Position inconnue',
      COMMAND_PORTAL_REPONSE_USES: 'Utilisations',
      COMMAND_PORTAL_RESPONSE_USES_REMAINING: (uses: string) => `${uses} utilisations restantes`,
      COMMAND_PORTAL_RESPONSE_UPDATED: (time: string, server: string) => `Mis à jour il y a ${time} pour le serveur ${server}.`,
      COMMAND_PORTAL_DESCRIPTION_SHORT: 'Affiche la position d\'un portail.',
      COMMAND_PORTAL_DESCRIPTION_EXTENDED: stripIndent`
        Récupères la position d'un portail sur le serveur de la guilde, ou sur un serveur particulier.
      `,
      COMMAND_PORTAL_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Afficher tous les portails :
        ${usage(prefix, 'portals')}
        Afficher la position du portail vers Xélorium :
        ${usage(prefix, 'portals xel')}
        Afficher la position du portail vers Ecafliplus sur le serveur Echo :
        ${usage(prefix, 'portals xel echo')}
      `,
      COMMAND_PORTAL_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'portal [dimension] [serveur]')}
        ${argument('dimension')} Dimension pour laquelle rechercher un portail (optionnel)
        ${argument('serveur')} Serveur sur lequel chercher un portail (optionnel)
      `,
      COMMAND_PORTAL_RESPONSE_NOSERVER: 'Pas de serveur correspondant trouvé.',

      // JOB Command
      COMMAND_JOB_RESPONSE_JOB_ALCHEMIST: 'Alchimiste',
      COMMAND_JOB_RESPONSE_JOB_JEWELLER: 'Bijoutier',
      COMMAND_JOB_RESPONSE_JOB_HANDYMAN: 'Bricoleur',
      COMMAND_JOB_RESPONSE_JOB_LUMBERJACK: 'Bûcheron',
      COMMAND_JOB_RESPONSE_JOB_HUNTER: 'Chasseur',
      COMMAND_JOB_RESPONSE_JOB_SHOEMAGUS: 'Cordomage',
      COMMAND_JOB_RESPONSE_JOB_SHOEMAKER: 'Cordonnier',
      COMMAND_JOB_RESPONSE_JOB_COSTUMAGUS: 'Costumage',
      COMMAND_JOB_RESPONSE_JOB_CRAFTMAGUS: 'Façomage',
      COMMAND_JOB_RESPONSE_JOB_ARTIFICER: 'Façonneur',
      COMMAND_JOB_RESPONSE_JOB_SMITHMAGUS: 'Forgemage',
      COMMAND_JOB_RESPONSE_JOB_SMITH: 'Forgeron',
      COMMAND_JOB_RESPONSE_JOB_JEWELMAGUS: 'Joaillomage',
      COMMAND_JOB_RESPONSE_JOB_MINER: 'Mineur',
      COMMAND_JOB_RESPONSE_JOB_FARMER: 'Paysan',
      COMMAND_JOB_RESPONSE_JOB_FISHERMAN: 'Pêcheur',
      COMMAND_JOB_RESPONSE_JOB_CARVMAGUS: 'Sculptemage',
      COMMAND_JOB_RESPONSE_JOB_CARVER: 'Sculpteur',
      COMMAND_JOB_RESPONSE_JOB_TAILOR: 'Tailleur',
      COMMAND_JOB_RESPONSE_NOJOBS: (member: string) => `Il n'y a pas encore de métier référencé pour ${member}.`,
      COMMAND_JOB_RESPONSE_NOBODY: (job: string) => `Personne ne possède le métier ${job}.`,
      COMMAND_JOB_RESPONSE_TITLE_ALL: 'Métiers',
      COMMAND_JOB_RESPONSE_TITLE_SINGLE: 'Métier',
      COMMAND_JOB_RESPONSE_ERROR: 'Une erreur est survenue au moment de récupérer les informations sur les métiers...',
      COMMAND_JOB_DESCRIPTION_SHORT: 'Informations sur les métiers des membres.',
      COMMAND_JOB_DESCRIPTION_EXTENDED: oneLine`
        Permet de référencer le niveau de ses propres métiers ou d'afficher les métiers
        des autres membres du serveur.
      `,
      COMMAND_JOB_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Indiquer que son métier 'Paysan' est au niveau 125 :
        ${usage(prefix, 'job paysan 100')}
        Vérifier le niveau de métier 'Forgeron' d'un autre membre :
        ${usage(prefix, 'job forgeron @Membre')}
        Vérifier tous les niveaux de métier d'un membre :
        ${usage(prefix, 'job @Membre')}
      `,
      COMMAND_JOB_DESCRIPTION_USAGE: (prefix: string) => stripIndent`
        ${usage(prefix, 'job [métier] [niveau] [membre]')}
        ${argument('métier')} Nom du métier à afficher/mettre à jour (optionnel)
        ${argument('niveau')} Nouveau niveau du métier dans le cas d'une mise à jour (optionnel)
        ${argument('membre')} Mention d'un membre pour qui afficher le(s) métier(s) (optionnel)
      `,
      COMMAND_JOBS_ARGUMENTS_LEVEL_RANGE: (level: number) => oneLine`
        Le niveau de métier '${level}' n'est pas compris entre les marges autorisées
        et sera adapté.
      `,
      COMMAND_JOBS_ARGUMENTS_PARSED_AS: (prefix: string, id: string, parsed: any[]) => stripIndent`
        Certaines options n'ont pas pu être validées.
        La commande sera interpretée comme suit :
        ${code(`${prefix}${id} ${parsed.join(' ')}`)}
      `
    };
  }

}
