import { Message, TextChannel } from 'discord.js';
import { Command } from '@/structures';
import { findPortalServer } from '@/utils';

const booleanOptionType = [
  ['enable', 'y', 'yes', 'true'],
  ['disable', 'n', 'no', 'false']
];
const parsedBooleanOptionType = [
  booleanOptionType[0][0],
  booleanOptionType[1][0]
];

/**
 * Change the color used in embed borders for the current guild.
 */
export default class SetCommand extends Command {

  public constructor() {
    super('set', {
      channel: 'guild',
      userPermissions: ['MANAGE_GUILD'],
      description: {
        'short': 'COMMAND_SET_DESCRIPTION_SHORT',
        'extended': 'COMMAND_SET_DESCRIPTION_EXTENDED',
        'example': 'COMMAND_SET_DESCRIPTION_EXAMPLE',
        'usage': 'COMMAND_SET_DESCRIPTION_USAGE'
      },
      args: [
        {
          id: 'almanax.auto',
          match: 'option',
          flag: 'almanax.auto',
          type: booleanOptionType
        },
        {
          id: 'almanax.channel',
          match: 'option',
          flag: 'almanax.channel',
          type: 'textChannel'
        },
        {
          id: 'dofus.server',
          match: 'option',
          flag: 'dofus.server',
          type: 'lowercase'
        },
        {
          id: 'news.auto',
          match: 'option',
          flag: 'news.auto',
          type: booleanOptionType
        },
        {
          id: 'news.channel',
          match: 'option',
          flag: 'news.channel',
          type: 'textChannel'
        }
      ]
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, args: { [key: string]: any }): Promise<Message> {
    try {
      const keys: string[] = [];
      const settings = this.get(message.guild!, 'settings', {});

      settings.channels = settings.channels || {};
      settings.dofus = settings.dofus || {};
      settings.tasks = settings.tasks || {};

      const isSet = {
        'almanax.auto': parsedBooleanOptionType.includes(args['almanax.auto']),
        'almanax.channel': args['almanax.channel'] instanceof TextChannel,
        'dofus.server': Boolean(args['dofus.server']),
        'news.auto': parsedBooleanOptionType.includes(args['news.auto']),
        'news.channel': args['news.channel'] instanceof TextChannel
      };

      // Enable the almanax task
      if (isSet['almanax.auto']) {
        settings.tasks.almanax = args['almanax.auto'] === 'enable' ? true : false;
        keys.push('almanax.auto');
      }

      // Configure the channel to use for the almanax
      if (isSet['almanax.channel']) {
        settings.channels.almanax = args['almanax.channel'].id;
        keys.push('almanax.channel');
      }

      // Configure the default Dofus server for the guild
      if (isSet['dofus.server']) {
        const server = await findPortalServer(args['dofus.server']);
        if (!server) throw new Error(`Unknown server: ${(<string> args['dofus.server'])}`);
        settings.dofus.server = server;
        keys.push('dofus.server');
      }

      // Enable fetching news from Twitter
      if (isSet['news.auto']) {
        settings.tasks.news = args['news.auto'] === 'enable' ? true : false;
        keys.push('news.auto');
      }

      // Configure the channel to use for the news
      if (isSet['news.channel']) {
        settings.channels.news = args['news.channel'].id;
        keys.push('news.channel');
      }

      await this.set(message.guild!, 'settings', settings);
      return this.success(message, this.t('COMMAND_SET_RESPONSE_MODIFIED', message, keys));
    } catch (error) {
      return this.error(message, this.t('COMMAND_SET_RESPONSE_ERROR', message));
    }
  }

}
