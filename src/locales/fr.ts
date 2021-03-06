/* eslint-disable @typescript-eslint/naming-convention */

import { oneLine, stripIndent } from 'common-tags';
import { Locale } from '@/structures';
import { usage, argument, code, formatNumber } from '@/utils';

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

      // Timings
      TIMING_SECOND: (seconds: number) => `${seconds} seconde${seconds > 1 ? 's' : ''}`,
      TIMING_MINUTE: (minutes: number) => `${minutes} minute${minutes > 1 ? 's' : ''}`,
      TIMING_HOUR: (hours: number) => `${hours} heure${hours > 1 ? 's' : ''}`,
      TIMING_DAY: (days: number) => `${days} jour${days > 1 ? 's' : ''}`,
      TIMING_MONTH: (months: number) => `${months} mois`,
      TIMING_YEAR: (years: number) => `${years} an${years > 1 ? 's' : ''}`,

      // Yes / No
      YES: 'Oui',
      NO: 'Non',

      // Message statuses
      MESSAGE_STATUS_SUCCESS: 'Youpie !',
      MESSAGE_STATUS_ERROR: 'Aïe !',
      MESSAGE_STATUS_WARNING: 'Hmmm...',

      // Prompting
      MODIFY_PROMPT_CANCEL_OR_TIMEOUT: (time: string) => oneLine`
        Tapez \`cancel\` pour annuler cette action.
        La commande sera annulée automatiquement dans ${time}
        si vous n'avez pas fourni de réponse dans le temps imparti.
      `,
      DEFAULT_PROMPT_TIMEOUT: 'Aucune réponse n\'a été fournie dans les temps, la commande a été annulée.',
      DEFAULT_PROMPT_CANCEL: 'La commande a été annulée.',
      DEFAULT_PROMPT_ENDED: 'Nombre maximum d\'essais atteint, la commande a été annulée.',
      DEFAULT_PROMPT_RETRY: 'Valeur invalide, veuillez réessayer.',

      // Arguments
      ARGUMENT_OPTIONAL: 'optionnel',
      ARGUMENT_NO_DESCRIPTION: 'Pas de description disponnible pour cette option',

      // Dofus Transport Types
      DOFUS_TRANSPORT_BOAT: 'Bateau',
      DOFUS_TRANSPORT_FRIGOSTIAN_CARRIER: 'Transporteur Frigostien',
      DOFUS_TRANSPORT_FRIGOSTIAN_SKI: 'Skis',
      DOFUS_TRANSPORT_IMP_CARRIER: 'Transporteur Brigandin',
      DOFUS_TRANSPORT_SAND_YACHT: 'Char à Voile',
      DOFUS_TRANSPORT_SCARPLANES: 'Scaéroplane',
      DOFUS_TRANSPORT_STAGECOACH: 'Diligence',
      DOFUS_TRANSPORT_ZAAP: 'Zaap',
      DOFUS_TRANSPORT_ZAAPI: 'Zaapi',
      DOFUS_TRANSPORT_QUAY: 'Quai',

      // Dofus Zones
      DOFUS_ZONE_HAKAM_TREE_CANOPY_VILLAGE: 'Village de la Canopée',
      DOFUS_ZONE_HAKAM_TREE_ZOTH_VILLAGE: 'Village des Zoth',
      DOFUS_ZONE_INCARNAM_CEMETERY: 'Cimetière',
      DOFUS_ZONE_INCARNAM_PASTURES: 'Pâturages',
      DOFUS_ZONE_INCARNAM_WAY_OF_SOULS: 'Route des Âmes',
      DOFUS_ZONE_MAIN_ABANDONED_LABOWATOWIES: 'Laboratoires Abandonnés',
      DOFUS_ZONE_MAIN_AERDALA: 'Aerdala',
      DOFUS_ZONE_MAIN_ALBATROCIOUS_ROCK: 'Roc des Salbatroces',
      DOFUS_ZONE_MAIN_ALLIANCE_TEMPLE: 'Temple des Alliances',
      DOFUS_ZONE_MAIN_ALMAS_CRADLE: 'Berceau d\'Alma',
      DOFUS_ZONE_MAIN_AMAKNA_CASTLE: 'Château d\'Amakna',
      DOFUS_ZONE_MAIN_AMAKNA_VILLAGE: 'Village d\'Amakna',
      DOFUS_ZONE_MAIN_ASPARAH_GORGE: 'Crevasse Perge',
      DOFUS_ZONE_MAIN_ASTRUB_CITY: 'Cité d\'Astrub',
      DOFUS_ZONE_MAIN_BONTA_CITY_CENTER: 'Bonta - Centre-ville',
      DOFUS_ZONE_MAIN_BRAKMAR_CITY_CENTER: 'Brâkmar - Centre-ville',
      DOFUS_ZONE_MAIN_BRAKMAR_CITY_WALLS: 'Bordure de Brâkmar',
      DOFUS_ZONE_MAIN_BREEDER_VILLAGE: 'Village des Éleveurs',
      DOFUS_ZONE_MAIN_CANIA_BAY: 'Baie de Cania',
      DOFUS_ZONE_MAIN_CANIA_FIELDS: 'Champs de Cania',
      DOFUS_ZONE_MAIN_CANIA_LAKE: 'lac de Cania',
      DOFUS_ZONE_MAIN_CANIA_MASSIF: 'Massif de Cania',
      DOFUS_ZONE_MAIN_CARAVAN_ALLEY: 'Route des Roulottes',
      DOFUS_ZONE_MAIN_CASTUC_TERRITORY: 'Territoire Cactère',
      DOFUS_ZONE_MAIN_CAWWOT_ISLAND: 'Île de la Cawotte',
      DOFUS_ZONE_MAIN_COASTAL_VILLAGE: 'Village Côtier',
      DOFUS_ZONE_MAIN_CORAL_BEACH: 'Plage de Corail',
      DOFUS_ZONE_MAIN_CRACKLER_MOUNTAIN: 'Montagne des Craqueleurs',
      DOFUS_ZONE_MAIN_CRADLE: 'Tainéla',
      DOFUS_ZONE_MAIN_CROCUZKO: 'Crocuzko',
      DOFUS_ZONE_MAIN_DESECRATED_HIGHLANDS: 'Terres Désacrées',
      DOFUS_ZONE_MAIN_DOPPLE_VILLAGE: 'Village des Dopeuls',
      DOFUS_ZONE_MAIN_DREGGON_PENINSULA: 'Presqu\'île des Dragoeufs',
      DOFUS_ZONE_MAIN_DUNES_OF_BONES: 'Dunes des Ossements',
      DOFUS_ZONE_MAIN_EDGE_OF_THE_EVIL_FOREST: 'Bord de la Forêt Maléfique',
      DOFUS_ZONE_MAIN_ENTRANCE_TO_HAREBOURGS_CASTLE: 'Entrée du Château de Harebourg',
      DOFUS_ZONE_MAIN_FANGS_OF_GLASS: 'Crocs de Verre',
      DOFUS_ZONE_MAIN_FRIGOST_VILLAGE: 'La Bourgade',
      DOFUS_ZONE_MAIN_FROZEN_LAKE: 'Lac Gelé',
      DOFUS_ZONE_MAIN_FUNGUS_DOMAIN: 'Domaine des Fungus',
      DOFUS_ZONE_MAIN_GOBBALL_CORNER: 'Coin des Bouftous',
      DOFUS_ZONE_MAIN_GORGE_OF_HOWLING_WINDS: 'Gorge des Vents Hurlants',
      DOFUS_ZONE_MAIN_GRASSY_PLAINS: 'Plaines Herbeuses',
      DOFUS_ZONE_MAIN_NOLIFIS_CEMETERY: 'Cimetière de Grobe',
      DOFUS_ZONE_MAIN_HEROES_CEMETERY: 'Cimetière des Héros',
      DOFUS_ZONE_MAIN_ICEFIELDS: 'Champs de Glace',
      DOFUS_ZONE_MAIN_IMP_VILLAGE: 'Village des Brigandins',
      DOFUS_ZONE_MAIN_JELLY_PENINSULA: 'Péninsule des Gelées',
      DOFUS_ZONE_MAIN_KANIG_VILLAGE: 'Village des Kanigs',
      DOFUS_ZONE_MAIN_KAWAII_RIVER: 'Rivière Kawaii',
      DOFUS_ZONE_MAIN_KWISMAS_HAVEN: 'Havre de Nowel',
      DOFUS_ZONE_MAIN_LOUSY_PIG_PLAIN: 'Plaine des Porkass',
      DOFUS_ZONE_MAIN_LOW_CRACKLER_MOUNTAIN: 'Montagne Basse des Craqueleurs',
      DOFUS_ZONE_MAIN_MADRESTAM_HARBOUR: 'Port de Madrestam',
      DOFUS_ZONE_MAIN_MINOTOROR_ISLAND: 'île du Minotoror',
      DOFUS_ZONE_MAIN_MOUNT_SCAULDRON: 'Mont Torrideau',
      DOFUS_ZONE_MAIN_PANDALA_VILLAGE: 'Village de Pandala',
      DOFUS_ZONE_MAIN_PETRIFIED_FOREST: 'Forêt Pétrifiée',
      DOFUS_ZONE_MAIN_ROCKY_PLAINS: 'Plaines Rocheuses',
      DOFUS_ZONE_MAIN_ROCKY_ROADS: 'Routes Rocailleuses',
      DOFUS_ZONE_MAIN_SAKAI_HARBOUR: 'Port de Sakaï',
      DOFUS_ZONE_MAIN_SAKAI_PLAIN: 'Plaine de Sakaï',
      DOFUS_ZONE_MAIN_SARAKECH_PORT: 'Port de Sarakech',
      DOFUS_ZONE_MAIN_SCARALEAF_PLAIN: 'Plaine des Scarafeuilles',
      DOFUS_ZONE_MAIN_SNOWBOUND_VILLAGE: 'Village Enseveli',
      DOFUS_ZONE_MAIN_SUFOKIA: 'Sufokia',
      DOFUS_ZONE_MAIN_SUFOKIAN_SHORELINE: 'Rivage Sufokien',
      DOFUS_ZONE_MAIN_TEARS_OF_OURONIGRIDE: 'Larmes d\'Ouronigride',
      DOFUS_ZONE_MAIN_TURTLE_BEACH: 'Plage de la Tortue',
      DOFUS_ZONE_MAIN_VULKANIA_VILLAGE: 'Village de Vulkania',
      DOFUS_ZONE_MAIN_BONTA_ALCHEMISTS_WORKSHOP: 'Bonta - Atelier des Alchimistes',
      DOFUS_ZONE_MAIN_BONTA_CARVERS_WORKSHOP: 'Bonta - Atelier des Sculpteurs',
      DOFUS_ZONE_MAIN_BONTA_FARMERS_WORKSHOP: 'Bonta -  Atelier des Paysans',
      DOFUS_ZONE_MAIN_BONTA_FISHERMENS_WORKSHOP: 'Bonta - Atelier des Pêcheurs',
      DOFUS_ZONE_MAIN_BONTA_HANDYMENS_WORKSHOP: 'Bonta - Atelier des Bricoleurs',
      DOFUS_ZONE_MAIN_BONTA_HUNTERS_WORKSHOP: 'Bonta - Atelier des Chasseurs',
      DOFUS_ZONE_MAIN_BONTA_JEWELLERS_WORKSHOP: 'Bonta - Atelier des Bijoutiers',
      DOFUS_ZONE_MAIN_BONTA_MINERS_WORKSHOP: 'Bonta - Atelier des Mineurs',
      DOFUS_ZONE_MAIN_BONTA_SHOEMAKERS_WORKSHOP: 'Bonta - Atelier des Cordonniers',
      DOFUS_ZONE_MAIN_BONTA_SMITHMAGIS_WORKSHOP: 'Bonta - Atelier des Forgemages',
      DOFUS_ZONE_MAIN_BONTA_SMITHS_WORKSHOP: 'Bonta - Atelier des Forgerons',
      DOFUS_ZONE_MAIN_BONTA_TAILORS_WORKSHOP: 'Bonta - Atelier des Tailleurs',
      DOFUS_ZONE_MAIN_BONTA_CONSUMABLES_MARKETPLACE: 'Bonta - Hôtel de Vente des Consommables',
      DOFUS_ZONE_MAIN_BONTA_CREATURE_MARKETPLACE: 'Bonta - Hôtel de Vente des Créatures',
      DOFUS_ZONE_MAIN_BONTA_EQUIPMENT_MARKETPLACE: 'Bonta - Hôtel de Vente des Équipements',
      DOFUS_ZONE_MAIN_BONTA_RESOURCE_MARKETPLACE: 'Bonta - Hôtel de Vente des Ressources',
      DOFUS_ZONE_MAIN_BONTA_RUNE_MARKETPLACE: 'Bonta - Hôtel de Vente des Runes',
      DOFUS_ZONE_MAIN_BONTA_SOUL_MARKETPLACE: 'Bonta - Hôtel de Vente des Âmes',
      DOFUS_ZONE_MAIN_BONTA_ARENA: 'Bonta - Arène',
      DOFUS_ZONE_MAIN_BONTA_ATYU_SIRVISS_INN: 'Bonta - Taverne Alakarte',
      DOFUS_ZONE_MAIN_BONTA_BRAGUTTE_INN: 'Bonta - Taverne de la Bragutte',
      DOFUS_ZONE_MAIN_BONTA_BANK: 'Bonta - Banque',
      DOFUS_ZONE_MAIN_BONTA_FEUBUK_INN: 'Bonta - Taverne du Feubuk',
      DOFUS_ZONE_MAIN_BONTA_KIKIM_INN: 'Bonta - Taverne de la Tabasse',
      DOFUS_ZONE_MAIN_BONTA_LIBRARY: 'Bonta - Bibliothèque',
      DOFUS_ZONE_MAIN_BONTA_MARKET_PLACE: 'Bonta - Place Marchande',
      DOFUS_ZONE_MAIN_BONTA_MILITIA: 'Bonta - Milice',
      DOFUS_ZONE_MAIN_BONTA_PINCHAUT_INN: 'Bonta - Taverne du Pinchaut',
      DOFUS_ZONE_MAIN_BONTA_PROFESSION_INFORMATION_CENTER: 'Bonta - Hôtel des Métiers',
      DOFUS_ZONE_MAIN_BONTA_SWASHBUCKLER_INN: 'Bonta - Taverne du Ferayeur',
      DOFUS_ZONE_MAIN_BONTA_TOWER_OF_BONTARIAN_ORDERS: 'Bonta - Tours des Ordres',
      DOFUS_ZONE_MAIN_BONTA_WOODENGLAS_INN: 'Bonta - Taverne de la Chopenbois',
      DOFUS_ZONE_MAIN_BRAKMAR_ALCHEMISTS_WORKSHOP: 'Brâkmar - Atelier des Alchimistes',
      DOFUS_ZONE_MAIN_BRAKMAR_CARVERS_WORKSHOP: 'Brâkmar - Atelier des Sculpteurs',
      DOFUS_ZONE_MAIN_BRAKMAR_FARMERS_WORKSHOP: 'Brâkmar -  Atelier des Paysans',
      DOFUS_ZONE_MAIN_BRAKMAR_FISHERMENS_WORKSHOP: 'Brâkmar Atelier des Pêcheurs',
      DOFUS_ZONE_MAIN_BRAKMAR_HANDYMENS_WORKSHOP: 'Brâkmar Atelier des Bricoleurs',
      DOFUS_ZONE_MAIN_BRAKMAR_HUNTERS_WORKSHOP: 'Brâkmar - Atelier des Chasseurs',
      DOFUS_ZONE_MAIN_BRAKMAR_JEWELLERS_WORKSHOP: 'Brâkmar - Atelier des Bijoutiers',
      DOFUS_ZONE_MAIN_BRAKMAR_MINERS_WORKSHOP: 'Brâkmar - Atelier des Mineurs',
      DOFUS_ZONE_MAIN_BRAKMAR_SHOEMAKERS_WORKSHOP: 'Brâkmar - Atelier des Cordonniers',
      DOFUS_ZONE_MAIN_BRAKMAR_SMITHMAGIS_WORKSHOP: 'Brâkmar Atelier des Forgemages',
      DOFUS_ZONE_MAIN_BRAKMAR_SMITHS_WORKSHOP: 'Brâkmar - Atelier des Forgerons',
      DOFUS_ZONE_MAIN_BRAKMAR_TAILORS_WORKSHOP: 'Brâkmar - Atelier des Tailleurs',
      DOFUS_ZONE_MAIN_BRAKMAR_CONSUMABLES_MARKETPLACE: 'Brâkmar - Hôtel de Vente des Consommables',
      DOFUS_ZONE_MAIN_BRAKMAR_CREATURE_MARKETPLACE: 'Brâkmar - Hôtel de Vente des Créatures',
      DOFUS_ZONE_MAIN_BRAKMAR_EQUIPMENT_MARKETPLACE: 'Brâkmar - Hôtel de Vente des Équipements',
      DOFUS_ZONE_MAIN_BRAKMAR_RESOURCE_MARKETPLACE: 'Brâkmar - Hôtel de Vente des Ressources',
      DOFUS_ZONE_MAIN_BRAKMAR_RUNE_MARKETPLACE: 'Brâkmar - Hôtel de Vente des Runes',
      DOFUS_ZONE_MAIN_BRAKMAR_SOUL_MARKETPLACE: 'Brâkmar - Hôtel de Vente des Âmes',
      DOFUS_ZONE_MAIN_BRAKMAR_ARENA: 'Brâkmar - Arène',
      DOFUS_ZONE_MAIN_BRAKMAR_ATOLMONDS_INN: 'Brâkmar - Taverne Atolmond',
      DOFUS_ZONE_MAIN_BRAKMAR_BANK: 'Brakmar - Banque',
      DOFUS_ZONE_MAIN_BRAKMAR_BURNT_CAT_INN: 'Brâkmar - Taverne du Chabrulé',
      DOFUS_ZONE_MAIN_BRAKMAR_BWORK_INN: 'Brâkmar - Taverne du Bwork',
      DOFUS_ZONE_MAIN_BRAKMAR_DJAUL_INN: 'Brâkmar - Taverne de Djaul',
      DOFUS_ZONE_MAIN_BRAKMAR_EXIT: 'Brâkmar - Sortie',
      DOFUS_ZONE_MAIN_BRAKMAR_LIBRARY: 'Brâkmar - Bibliothèque',
      DOFUS_ZONE_MAIN_BRAKMAR_MARKET_PLACE: 'Brâkmar - Place Marchande',
      DOFUS_ZONE_MAIN_BRAKMAR_MILITIA: 'Brâkmar - Milice',
      DOFUS_ZONE_MAIN_BRAKMAR_MISERY_INN: 'Brâkmar - Taverne de la Misère',
      DOFUS_ZONE_MAIN_BRAKMAR_PROFESSION_INFORMATION_CENTER: 'Brâkmar - Hôtel des Métiers',
      DOFUS_ZONE_MAIN_BRAKMAR_PUBLIC_PADDOCK: 'Brâkmar - Enclos Public',
      DOFUS_ZONE_MAIN_BRAKMAR_TOWER_OF_BRAKMARIAN_ORDERS: 'Brâkmar - Tour de Brâkmar',
      DOFUS_ZONE_MAIN_SUFOKIA_JELLY_QUAY: 'Sufokia - Quai des Gelées',
      DOFUS_ZONE_MAIN_SUFOKIA_DIY_QUAY: 'Sufokia - Quai de la Bricole',
      DOFUS_ZONE_MAIN_SUFOKIA_BANDIT_QUAY: 'Sufokia - Quai des Bandits',
      DOFUS_ZONE_MAIN_SUFOKIA_TEMPLE_WAY_QUAY: 'Sufokia - Quai de la Voie du Temple',

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
      COMMAND_PREFIX_DESCRIPTION_ARGUMENT_PREFIX: 'Nouveau préfixe à appliquer',
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
      COMMAND_LOCALE_DESCRIPTION_ARGUMENT_LOCALE: 'Code en deux lettres de la langue à appliquer',
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
      COMMAND_COLOR_DESCRIPTION_ARGUMENT_COLOR: 'Nouvelle couleur à appliquer',
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
      COMMAND_HELP_DESCRIPTION_ARGUMENT_COMMAND: 'Commande pour laquelle afficher l\'aide étendue',
      COMMAND_HELP_CATEGORY_SETTINGS: 'Paramètres',
      COMMAND_HELP_CATEGORY_UTILS: 'Utilitaires',
      COMMAND_HELP_CATEGORY_DOFUS: 'Dofus',
      COMMAND_HELP_CATEGORY_GAMES: 'Mini-Jeux',
      COMMAND_HELP_CATEGORY_MISC: 'Divers',
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
        ${usage(prefix, 'echo #general --file https://www.cesitenexistepas.com/image.jpg <message>')}
      `,
      COMMAND_ECHO_DESCRIPTION_ARGUMENT_TARGET: 'Salon dans lequel envoyer le message',
      COMMAND_ECHO_DESCRIPTION_ARGUMENT_FILE: 'URL d\'un fichier à joindre',
      COMMAND_ECHO_DESCRIPTION_ARGUMENT_CONTENT: 'Contenu du message à envoyer',
      COMMAND_ECHO_RESPONSE_NO_CONTENT: 'Je ne peux pas répéter un message vide...',
      COMMAND_ECHO_RESPONSE_NO_PERMISSION_CLIENT: (channel: string) => `Je ne possède pas les permissions nécéssaires pour écrire dans **#${channel}**`,
      COMMAND_ECHO_RESPONSE_NO_PERMISSION_USER: (channel: string) => `Vous ne possédez pas les permissions nécéssaires pour écrire dans **#${channel}**`,
      COMMAND_ECHO_RESPONSE_SENT: (channel: string) => `Message envoyé dans le channel **#${channel}**`,

      // ALMANAX Command
      COMMAND_ALMANAX_DESCRIPTION_SHORT: 'Récupère l\'almanax du jour.',
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
        ${usage(prefix, 'almanax --detail +7')}
      `,
      COMMAND_ALMANAX_DESCRIPTION_ARGUMENT_EXTENDED: 'Affiche la version étendue',
      COMMAND_ALMANAX_DESCRIPTION_ARGUMENT_OFFSET: 'Date ou nombre de jours à ajouter par rapport à la date du jour',
      COMMAND_ALMANAX_RESPONSE_SCRAPE_ERROR: 'Impossible de récupérer l\'Almanax pour le moment...',
      COMMAND_ALMANAX_RESPONSE_DATE_ERROR: (input: string) => `La valeur \`${input}\` ne correspond pas à une date valide.`,
      COMMAND_ALMANAX_RESPONSE_ALMANAX: (day: string, month: string) => `Almanax du ${day} ${month}`,
      COMMAND_ALMANAX_RESPONSE_DESCRIPTION: 'Effet Méryde',

      // SET Command
      COMMAND_SET_DESCRIPTION_SHORT: 'Assigne une valeur à un paramètre.',
      COMMAND_SET_DESCRIPTION_EXTENDED: stripIndent`
        ${oneLine`
          Configure le serveur pour activer ou désactiver des fonctions de ce bot. Plusieurs clés peuvent être
          configurées à la fois, mais au moins une clé doit être indiquée.
        `}
        Si une valeur contient un ou plusieurs espaces, elle devra être entourée de guillemets.
      `,
      COMMAND_SET_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Active l'almanax automatique dans le salon '\#almanax' :
        ${usage(prefix, 'set almanax \#almanax')}
        Configure le serveur par défaut comme étant Oto Mustam :
        ${usage(prefix, 'set server "oto mustam"')}
      `,
      COMMAND_SET_DESCRIPTION_ARGUMENT_KEYS: stripIndent`
        Liste de paires clé-valeur à configurer; les clés valides sont :
        \u2022 \`almanax\` active l'almanax automatique et l'envoie dans le salon configuré
        \u2022 \`twitter\` active la récupération automatique des tweets et les envoie dans le salon configuré
        \u2022 \`dofus-server\` configure le serveur Dofus à utiliser par défaut dans les commandes
      `,
      COMMAND_SET_RESPONSE_PAIR: (key: string, value?: string) => `${key} → ${value || 'Aucun'}`,
      COMMAND_SET_RESPONSE_MODIFIED: (pairs: string[]) => stripIndent`
        ${pairs.length > 1 ? 'Les clés suivantes ont été mises' : 'La clé suivante a été mise'} à jour :
        ${code(pairs.join('\n'))}
      `,
      COMMAND_SET_RESPONSE_NO_KEYS: 'Au moins une paire clé-valeur doit être indiquée.',
      COMMAND_SET_RESPONSE_INVALID_PAIRS: 'Le nombre de clés et de valeurs est différent.',
      COMMAND_SET_RESPONSE_INVALID_VALUES: (keys: string[]) => stripIndent`
        ${keys.length > 1 ? 'Les valeurs des clés suivantes sont invalides' : 'La valeur de la clé suivante est invalide'} :
        ${code(keys.join('\n'))}
      `,

      // GET Command
      COMMAND_GET_DESCRIPTION_SHORT: 'Affiche la valeur d\'un paramètre.',
      COMMAND_GET_DESCRIPTION_EXTENDED: stripIndent`
        Affiche les valeurs liées à une ou plusieurs clé(s) de paramétrage.
        Les valeurs sont affichées pour le serveur courant uniquement.
      `,
      COMMAND_GET_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Affiche le salon dans lequel l'almanax est envoyé :
        ${usage(prefix, 'get almanax')}
        Affiche tous les paramètres enregistrés :
        ${usage(prefix, 'get')}
      `,
      COMMAND_GET_DESCRIPTION_ARGUMENT_KEYS: stripIndent`
        Clés pour lesquelles afficher la valeur configurée; les clés valides sont :
        \u2022 \`almanax\` salon dans lequel l'almanax sera envoyé automatiquement chaque jour
        \u2022 \`twitter\` salon dans lequel les tweets des comptes suivis seront envoyés
        \u2022 \`dofus-server\` serveur Dofus utilisé par défaut dans les commandes qui en ont besoin
        \u2022 \`prefix\` le préfixe configuré pour lancer les commandes
        \u2022 \`color\` le code couleur utilisé pour les inserts
        \u2022 \`locale\` la langue utilisée par le bot pour répondre
      `,
      COMMAND_GET_RESPONSE_PAIR: (key: string, value?: string) => `${key} → ${value || 'Aucun'}`,
      COMMAND_GET_RESPONSE_PAIRS: (pairs: string[]) => stripIndent`
        Les clés suivantes sont configurées :
        ${code(pairs.join('\n'))}
      `,
      COMMAND_GET_RESPONSE_INVALID_KEYS: (keys: string[]) => stripIndent`
        Les clés demandées sont invalides, veuillez vérifier leur orthographe et réessayer :
        ${code(keys.join('\n'))}
      `,
      COMMAND_GET_RESPONSE_NO_KEYS: 'Aucune clé à afficher.',
      COMMAND_GET_RESPONSE_ERROR: 'Une erreur est survenue durant l\'exécution de la commande...',

      // PORTAL Command
      COMMAND_PORTAL_RESPONSE_NODATA: (server: { id: string; name: string }) => `Aucune donnée disponnible pour le serveur ${server.name}.`,
      COMMAND_PORTAL_RESPONSE_TO: (dimension: string) => `Portail vers ${dimension}`,
      COMMAND_PORTAL_RESPONSE_CYCLE: (cycle: string) => `Modificateur : ${cycle}`,
      COMMAND_PORTAL_REPONSE_POSITION: 'Dernière Position Connue',
      COMMAND_PORTAL_REPONSE_POSITION_UNKNOWN: 'Position inconnue',
      COMMAND_PORTAL_REPONSE_USES: 'Utilisations',
      COMMAND_PORTAL_RESPONSE_USES_REMAINING: (uses: string) => `${uses} utilisations restantes`,
      COMMAND_PORTAL_RESPONSE_UPDATED: (time: string, server: string) => `Mis à jour il y a ${time} pour le serveur ${server}.`,
      COMMAND_PORTAL_RESPONSE_TRANSPORTS: 'Moyens de Transports Proches',
      COMMAND_PORTAL_DESCRIPTION_SHORT: 'Affiche la position d\'un portail.',
      COMMAND_PORTAL_DESCRIPTION_EXTENDED: stripIndent`
        Récupères la position d'un portail sur le serveur de la guilde, ou sur un serveur particulier si indiqué.

        Les positions sont récupérées en temps réel sur [Dofus-Portals](https://dofus-portals.fr/).
      `,
      COMMAND_PORTAL_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Afficher tous les portails :
        ${usage(prefix, 'portals')}
        Afficher la position du portail vers Xélorium :
        ${usage(prefix, 'portals xel')}
        Afficher la position du portail vers Ecafliplus sur le serveur Echo :
        ${usage(prefix, 'portals xel echo')}
      `,
      COMMAND_PORTAL_DESCRIPTION_ARGUMENT_DIMENSION: 'Dimension pour laquelle rechercher un portail',
      COMMAND_PORTAL_DESCRIPTION_ARGUMENT_SERVER: 'Serveur sur lequel chercher un portail',
      COMMAND_PORTAL_RESPONSE_NOSERVER: 'Aucun serveur Dofus n\'a été spécifié, ou bien son nom est incorrect.',

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
      COMMAND_JOB_RESPONSE_NOJOB: (member: string, job: string) => `${member} ne possède pas encore le métier ${job}.`,
      COMMAND_JOB_RESPONSE_NOBODY: (job: string) => `Personne ne possède le métier ${job}.`,
      COMMAND_JOB_RESPONSE_TITLE_ALL: 'Métiers',
      COMMAND_JOB_RESPONSE_TITLE_SINGLE: 'Métier',
      COMMAND_JOBS_RESPONSE_INVALID_COMBINATION: (args: Record<string, string | number>) => stripIndent`
        La combinaison d'options suivante ne peut pas être utilisée :
        ${code(Object.entries(args).map(([key, value]) => `${key} → ${value}`).join('\n'))}
      `,
      COMMAND_JOB_DESCRIPTION_SHORT: 'Informations sur les métiers des membres.',
      COMMAND_JOB_DESCRIPTION_EXTENDED: oneLine`
        Permet de référencer le niveau de ses propres métiers ou d'afficher les métiers
        des autres membres de la guilde.
      `,
      COMMAND_JOB_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Indiquer que son métier 'Paysan' est au niveau 125 :
        ${usage(prefix, 'job paysan 100')}
        Vérifier le niveau de métier 'Forgeron' d'un autre membre :
        ${usage(prefix, 'job forgeron @Membre')}
        Vérifier tous les niveaux de métier d'un membre :
        ${usage(prefix, 'job @Membre')}
      `,
      COMMAND_JOB_DESCRIPTION_ARGUMENT_JOB: 'Nom du métier à afficher/mettre à jour',
      COMMAND_JOB_DESCRIPTION_ARGUMENT_LEVEL: 'Nouveau niveau du métier dans le cas d\'une mise à jour',
      COMMAND_JOB_DESCRIPTION_ARGUMENT_MEMBER: 'Mention d\'un membre pour qui afficher les métiers',
      COMMAND_JOBS_ARGUMENTS_LEVEL_IGNORED: 'Un niveau a été indiqué sans métier, il sera ignoré.',
      COMMAND_JOBS_ARGUMENTS_UNKNOWN: (args: (string | number)[]) => stripIndent`
        Le options suivantes n'ont pas pu être traitées :
        ${code(args.join('\n'))}
      `,

      // MONIT Command
      COMMAND_MONIT_DESCRIPTION_SHORT: 'Statistiques du client.',
      COMMAND_MONIT_DESCRIPTION_EXTENDED: oneLine`
        Affiche les statistiques techniques du client et de ses processus.

        Inclus la consommation des ressources matérielles du client ainsi que le temps passé depuis son dernier redémarrage.
      `,
      COMMAND_MONIT_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Affiche les statistiques techniques :
        ${usage(prefix, 'monit')}
      `,
      COMMAND_MONIT_RESPONSE_TITLE: (name: string, version: string) => oneLine`
        ${name} [v${version}]
      `,
      COMMAND_MONIT_RESPONSE_ARCH_TITLE: 'Architecture',
      COMMAND_MONIT_RESPONSE_ARCH_VALUE: (version: string, platform: string, arch: string) => code(`NodeJS ${version} [${platform} (${arch})]`),
      COMMAND_MONIT_RESPONSE_PROCESS_TITLE: 'Processus',
      COMMAND_MONIT_RESPONSE_PROCESS_VALUE: (name: string, pid: number) => {
        const lengths = { name: name.length, pid: pid.toString().length };
        const padding = Math.max(lengths.name, lengths.pid) + 1;
        return code(
          stripIndent`
            Nom : ${' '.repeat(padding - lengths.name)} ${name}
            PID : ${' '.repeat(padding - lengths.pid)} ${pid}
          `
        );
      },
      COMMAND_MONIT_RESPONSE_RESOURCES_TITLE: 'Ressources',
      COMMAND_MONIT_RESPONSE_RESOURCES_VALUE: (cpu: string, rss: string) => {
        const padding = Math.max(cpu.length, rss.length) + 1;
        return code(
          stripIndent`
            CPU :     ${' '.repeat(padding - cpu.length)}  ${cpu} %
            Mémoire : ${' '.repeat(padding - rss.length)} ${rss} MB
          `
        );
      },
      COMMAND_MONIT_RESPONSE_DISCORD_TITLE: 'Discord',
      COMMAND_MONIT_RESPONSE_DISCORD_VALUE: (heartbeat: number, shards: number) => {
        const lengths = { hb: heartbeat.toString().length, shards: shards.toString().length };
        const padding = Math.max(lengths.hb, lengths.shards) + 1;
        return code(
          stripIndent`
            Latence : ${' '.repeat(padding - lengths.hb)} ${heartbeat} ms
            Shards :  ${' '.repeat(padding - lengths.shards)}    ${shards}
          `
        );
      },
      COMMAND_MONIT_RESPONSE_UPTIME: (uptime: string) => `En ligne depuis ${uptime}`,

      // DICE Command
      COMMAND_DICE_DESCRIPTION_SHORT: 'Lancé de dés.',
      COMMAND_DICE_DESCRIPTION_EXTENDED: oneLine`
        Lance un ou plusieurs dés à faces variables en renvoie le score total obtenu aléatoirement.
      `,
      COMMAND_DICE_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Lancer un dé à 6 faces :
        ${usage(prefix, 'roll')}
        Lancer deux dés de 100 faces chacun :
        ${usage(prefix, '2d100')}
      `,
      COMMAND_DICE_DESCRIPTION_ARGUMENT_ROLLS: `Quantité de dés à lancer, et nombre de faces sur chaque dé, dans le format \`<lancés>d<faces>\``,
      COMMAND_DICE_ERROR_ROLLS: (max: number) => `Le nombre de jets est trop élevé. Le maximum autorisé est ${formatNumber(max)}.`,
      COMMAND_DICE_ERROR_SIZE: (max: number) => `Le nombre de faces est trop élevé. Le maximum autorisé est ${formatNumber(max)}.`,
      COMMAND_DICE_ERROR_FLOAT: 'Le nombre de jets et le nombre de faces doivent être des nombres entiers.',
      COMMAND_DICE_ERROR_ROLLS_ZERO: 'Le nombre de jets ne peut pas être plus petit que `1`.',
      COMMAND_DICE_ERROR_SIZE_ZERO: 'Le nombre de faces ne peut pas être plus petit que `1`.',
      COMMAND_DICE_RESPONSE_EXPLAIN: (rolls: number, faces: number) => `🎲 Lancé de ${formatNumber(rolls)} dé${rolls > 1 ? 's' : ''} à ${formatNumber(faces)} faces`,
      COMMAND_DICE_RESPONSE_TOTAL: (total: number) => `Score : ${formatNumber(total)}`,
      COMMAND_DICE_RESPONSE_DETAIL: (scores: number[]) => {
        const joined = code(scores.join(' + '));
        return joined.length < 2048 ? joined : 'Le détail est trop long pour être affiché.';
      },

      // POLL Command
      COMMAND_POLL_DESCRIPTION_SHORT: 'Sondages.',
      COMMAND_POLL_DESCRIPTION_EXTENDED: oneLine`
        Crée un sondage et récolte les réponses entrées par les utilisateurs.
        Le sondage peut être configuré pour n'accepter qu'une seule réponse par utilisateur, ou bien plusieurs.
        La première ligne de texte du message correspondra à la question du sondage.
        Chaque line après celle-là sera utilisée comme proposition.
        Utilisez \`Maj+Entrée\` pour insérer une nouvelle ligne dans votre message.
      `,
      COMMAND_POLL_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Création d'un sondage ouvert pendant 24 heures :
        ${usage(prefix, 'poll Question ?\nRéponse 1\nRéponse 2')}
        Création d'un sondage ouvert pendant 10 jours :
        ${usage(prefix, 'poll time:10j Question ?\nRéponse 1\nRéponse 2')}
        Création d'un sondage dont les réponses possibles sont "Oui" et "Non" et pour lequel l'utilisateur ne peut séléctionner qu'une réponse :
        ${usage(prefix, 'poll multi:false Question ?')}
      `,
      COMMAND_POLL_DESCRIPTION_ARGUMENT_TIME: 'Durée du sondage, un nombre suivit d\'un suffixe (j = jours, h = heures, m = minutes)',
      COMMAND_POLL_DESCRIPTION_ARGUMENT_MULTI: 'Si le même utilisateur peut voter plusieurs fois pour une réponse différente (\'oui\' ou \'non\')',
      COMMAND_POLL_DESCRIPTION_ARGUMENT_TEXT: 'Titre et propositions du sondage, une par ligne',
      COMMAND_POLL_RESPONSE_NO_TITLE: 'Aucune question n\'a été posée.',
      COMMAND_POLL_RESPONSE_NOT_ENOUGH_PROPOSITIONS: 'Un sondage ne peut pas avoir qu\'une seule proposition.',
      COMMAND_POLL_RESPONSE_PROPOSITION_TOO_LONG: 'Une ou plusieurs propositions sont trop longues (max. 96 caractères autorisés).',
      COMMAND_POLL_RESPONSE_TIME_TOO_LOW: 'Le temps avant fermeture automatique ne peut pas être plus petit que 1 minute.',
      COMMAND_POLL_RESPONSE_TITLE: (title: string) => `Sondage : ${title}`,
      COMMAND_POLL_RESPONSE_RESULTS: (title: string) => `Résultats : ${title}`,
      COMMAND_POLL_RESPONSE_FOOTER: (reactions: string[], time: string) => stripIndent`
        Réagissez à ce message avec ${reactions.slice(1, -1).join(', ')} ou ${reactions[reactions.length - 1]} pour voter.
        Le créateur du sondage peut réagir avec ${reactions[0]} pour fermer le sondage immédiatement.
        Le sondage sera fermé automatiquement le ${time}.
      `,
      COMMAND_POLL_RESPONSE_CLOSED_FOOTER: 'Cliquez sur le graphique pour agrandir.',

      // REMINDER Command
      COMMAND_REMIND_DESCRIPTION_SHORT: 'Rappel.',
      COMMAND_REMIND_DESCRIPTION_EXTENDED: oneLine`
        Envoie un rappel avec le contenu de son choix après un certain temps.
      `,
      COMMAND_REMIND_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Envoie un rappel contenant 'Test' dans 24 heures :
        ${usage(prefix, 'remind --in 1d Test')}
        Envoie un rappel contenant 'Test' le 12 février à 8:30 au matin:
        ${usage(prefix, 'remind --on 12/02 --at 8:30 Test')}
      `,
      COMMAND_REMIND_DESCRIPTION_ARGUMENT_IN: 'Durée après laquelle le rappel sera envoyé, un nombre suivit d\'un suffixe (j = jours, h = heures, m = minutes)',
      COMMAND_REMIND_DESCRIPTION_ARGUMENT_ON: 'Date à laquelle le rappel sera envoyé, peut être combiné avec `--at`',
      COMMAND_REMIND_DESCRIPTION_ARGUMENT_AT: 'Heure à laquelle le rappel sera envoyé, peut être combiné avec `--on`',
      COMMAND_REMIND_DESCRIPTION_ARGUMENT_TEXT: 'Texte à envoyer dans le rappel',
      COMMAND_REMIND_RESPONSE_INVALID_COMBINATION: 'L\'option `--in` ne peut pas être utilisée simultanément avec les options `--on` et/ou `--at`.',
      COMMAND_REMIND_RESPONSE_NO_CONTENT: 'Le rappel nécessite un contenu à envoyer.',
      COMMAND_REMIND_RESPONSE_TIME_TOO_LOW: 'Le rappel doit être planifié au moins une minute dans le futur.',
      COMMAND_REMIND_RESPONSE_SUCCESS: (time: string) => `Un rappel sera envoyé le ${time}.`,
      COMMAND_REMIND_RESPONSE_PROCESSED: (content: string, author: string) => `${author}\n**Rappel :** ${content}`,

      // ABOUT Command
      COMMAND_ABOUT_DESCRIPTION_SHORT: `A propos du bot.'`,
      COMMAND_ABOUT_DESCRIPTION_EXTENDED: 'Affiche des informations à propos de ce bot et de son utilité.',
      COMMAND_ABOUT_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Affiche les informations du bot :
        ${usage(prefix, 'about')}
      `,
      COMMAND_ABOUT_RESPONSE_TITLE: (name: string) => `A propos de ${name}`.toUpperCase(),
      COMMAND_ABOUT_RESPONSE_DESCRIPTION: (name: string, url: string) => stripIndent`
        ${oneLine`
          [${name}](${url}) est un bot Discord à but semi-générique visant à faciliter la gestion
          des guildes Dofus en proposant une suite d'outils et de commandes à ses utilisateurs.
        `}
      `,
      COMMAND_ABOUT_RESPONSE_FEATURES_TITLE: 'Fonctionnalités',
      COMMAND_ABOUT_RESPONSE_FEATURES_CONTENT: stripIndent`
        \u2022 Customisez le préfixe et les couleurs du bot
        \u2022 Profitez d'une expérience multilingue
        \u2022 Recevez les tweets en direct d'Ankama
        \u2022 Affichez l'almanax du jour automatiquement
        \u2022 Trouvez la position des portails grâce à [Dofus-Portals](https://dofus-portals.fr/)
        \u2022 Listez et partagez vos métiers en guilde
        \u2022 Participez à des events et mini-jeux sur Discord
        \u2022 Créez des sondages, programmez des rappels automatiques
        \u2022 Et bien d'autres choses...
      `,
      COMMAND_ABOUT_RESPONSE_INVITE_TITLE: 'Ajoutez-moi à votre serveur',
      COMMAND_ABOUT_RESPONSE_INVITE_CONTENT: (invite: string) => oneLine`
        Je peux être invité sur n'importe quel serveur Discord au moyen de ce [lien](${invite}).
      `,
      COMMAND_ABOUT_RESPONSE_SUPPORT_TITLE: 'Vous m\'offrez un café ?',
      COMMAND_ABOUT_RESPONSE_SUPPORT_CONTENT: oneLine`
        L'utilisation de ce bot est gratuite et le restera à jamais. Cependant, le faire
        fonctionner coûte du temps et l'argent à son auteur...
        Vous appréciez ce projet ?
        Pourquoi ne pas montrer votre support avec une petite [donation](https://www.paypal.com/donate?hosted_button_id=2XHYFQDDDNT84) ? :heart:

      `,
      COMMAND_ABOUT_RESPONSE_UPTIME: (version: string, uptime: string, author: string) => oneLine`
        Version ${version}
        \u2022 En ligne depuis ${uptime}
        \u2022 \u00A9 ${new Date().getFullYear()} ${author}
      `,

      // ZAAP Command
      COMMAND_ZAAP_DESCRIPTION_SHORT: 'Moyens de transport proches de coordonnées.',
      COMMAND_ZAAP_DESCRIPTION_EXTENDED: oneLine`
        Liste la distance entre les coordonnées d'une map en jeu et les moyens de transport
        les plus proches. Les transports sont listés du plus proche peut importe son type
        jusqu'au zaap le plus proche, avec la distance exprimée à vol d'oiseau.
        Des imprécisions sont à attendre puisqu'aucune simulation n'est effectuée pour trouver
        un chemin viable. De ce fait, certaines distances calculées peuvent nécessiter
        un détour ou peuvent même être injoignables depuis le transport listé. 
      `,
      COMMAND_ZAAP_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Trouve les moyens de transport les plus proches de la map située en [-21,2] :
        ${usage(prefix, 'zaap -21,2')}
      `,
      COMMAND_ZAAP_DESCRIPTION_ARGUMENT_COORDINATES: 'Coordonnées de la map visée en jeu.',
      COMMAND_ZAAP_RESPONSE_NO_COORDINATES: 'Vous devez indiquer les coordonnées d\'une map pour lister les transports proches de celle-ci.',
      COMMAND_ZAAP_RESPONSE_TITLE: (coords: { x: number; y: number; world: string }) => oneLine`
        Moyens de transport proches de [${coords.x},${coords.y}]
      `,
      COMMAND_ZAAP_RESPONSE_DESCRIPTION: (icon: string, type: string, zone: string, x: number, y: number, distance: number) =>
        `${icon} **[${x},${y}]** ${type} vers **${zone}** → ${distance} map${distance > 1 ? 's' : ''}`,
      COMMAND_ZAAP_RESPONSE_FOOTER: `Les distances sont indiquées à vol d'oiseau et peuvent être imprécises`,

      // ISSUE Command
      COMMAND_ISSUE_DESCRIPTION_SHORT: 'Bugs et améliorations.',
      COMMAND_ISSUE_DESCRIPTION_EXTENDED: 'Rapportez un bug ou demandez une nouvelle fonctionalité.',
      COMMAND_ISSUE_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Rapporter un nouveau bug :
        ${usage(prefix, 'bug')}
        Demander une nouvelle fonctionalité :
        ${usage(prefix, 'request')}
      `,
      COMMAND_ISSUE_DESCRIPTION_ARGUMENT_TITLE: 'Un titre pour le bug à rapporter ou la fonctionalité à demander',
      COMMAND_ISSUE_DESCRIPTION_ARGUMENT_DESCRIPTION: oneLine`
        Dans le cas d'un rapport de bug, une description exhaustive des étapes à reproduire,
        le résultat obtenu et le résultat attendu;
        pour une demande d'amélioration, une description de ce qui est attendu
        et une brève explication des besoins que cela couvrirait
      `,
      COMMAND_ISSUE_DESCRIPTION_ARGUMENT_STATE: stripIndent`
        Le nouveau statut du ticket; peut seulement être modifié par les développeurs du bot; un parmi:
        \u2022 \`pending\` → En Attente d'Approbation
        \u2022 \`cancel\` → Annulé
        \u2022 \`dev\` → En Cours de Développement
        \u2022 \`test\` → En Phase de Test
        \u2022 \`deploy\` → Déployé
        \u2022 \`block\` → Blocké
      `,
      COMMAND_ISSUE_DESCRIPTION_ARGUMENT_TYPE: 'Type du ticket : soit `bug`, soit `feature`',
      COMMAND_ISSUE_PROMPT_START_TITLE: 'Veuillez fournir un titre court pour ce ticket.',
      COMMAND_ISSUE_PROMPT_START_DESCRIPTION: 'Veuillez fournir une description pour ce ticket.\nTapez `skip` pour passer cette étape.',
      COMMAND_ISSUE_PROMPT_RETRY_STATE: 'Statut invalide, veuillez réessayer.',
      COMMAND_ISSUE_PROMPT_RETRY_TYPE: 'Type invalide, veuillez réessayer.',
      COMMAND_ISSUE_RESPONSE_NO_DESCRIPTION: 'Pas de description pour ce ticket.',
      COMMAND_ISSUE_RESPONSE_CHANGE_STATE_OWNERS_ONLY: 'Seuls les développeurs peuvent modifier le statut d\'un ticket.',
      COMMAND_ISSUE_RESPONSE_CHANGE_TYPE_OWNERS_ONLY: 'Seuls les développeurs peuvent modifier le type d\'un ticket.',
      COMMAND_ISSUE_RESPONSE_TYPE_BUG: 'Bug',
      COMMAND_ISSUE_RESPONSE_TYPE_FEATURE: 'Fonctionalité',
      COMMAND_ISSUE_RESPONSE_TYPE_UNKNOWN: 'Inconnu',
      COMMAND_ISSUE_RESPONSE_STATE_PENDING: 'En Attente d\'Approbation',
      COMMAND_ISSUE_RESPONSE_STATE_CANCEL: 'Annulé',
      COMMAND_ISSUE_RESPONSE_STATE_DEV: 'En Cours de Développement',
      COMMAND_ISSUE_RESPONSE_STATE_TEST: 'En Phase de Test',
      COMMAND_ISSUE_RESPONSE_STATE_DEPLOY: 'Déployé',
      COMMAND_ISSUE_RESPONSE_STATE_BLOCK: 'Blocké',
      COMMAND_ISSUE_RESPONSE_FIELD_TITLE_COMMENTS: 'Commentaires',
      COMMAND_ISSUE_RESPONSE_FIELD_TITLE_STATUS: 'Statut',
      COMMAND_ISSUE_RESPONSE_FIELD_TITLE_TYPE: 'Type de Ticket',
      COMMAND_ISSUE_RESPONSE_FIELD_UPDATED_AT: (date: string) => `*Mis à jour le ${date}*`,
      COMMAND_ISSUE_RESPONSE_UPDATED: (ref: string) => `Votre ticket ${ref} a été mis à jour.`,

      // ISSUES Command
      COMMAND_ISSUES_DESCRIPTION_SHORT: 'Liste des bugs et améliorations.',
      COMMAND_ISSUES_DESCRIPTION_EXTENDED: 'Liste les bugs rapportés et les améliorations proposées.',
      COMMAND_ISSUES_DESCRIPTION_EXAMPLE: (prefix: string) => stripIndent`
        Liste les tickets actifs :
        ${usage(prefix, '')}
        Liste les bugs :
        ${usage(prefix, 'issues --type bug')}
        List les tickets déployés :
        ${usage(prefix, 'issues --state deploy')}
      `,
      COMMAND_ISSUES_RESPONSE_LIST_NO_ISSUES: 'Il n\'y a pas de ticket enregistré correspondant au filtre actuel.',
      COMMAND_ISSUES_RESPONSE_LIST_TITLE: 'Liste des Tickets'
    };
  }

}
