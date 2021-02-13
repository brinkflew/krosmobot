import { Message } from 'discord.js';
import { Command } from '@/structures';
import { GuildDocument } from 'types';
import { Argument } from 'discord-akairo';

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
        'example': 'COMMAND_SET_DESCRIPTION_EXAMPLE'
      },
      args: [
        {
          id: 'keys',
          match: 'separate',
          type: 'lowercase',
          description: 'COMMAND_SET_DESCRIPTION_ARGUMENT_KEYS'
        }
      ]
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, args: { keys: string[] | null }): Promise<Message> {
    args.keys = args.keys || [];
    const hasFlags = Boolean(args.keys.length);

    if (!hasFlags) return this.error(message, this.t('COMMAND_SET_RESPONSE_NO_KEYS', message));
    if (args.keys.length % 2 !== 0) return this.error(message, this.t('COMMAND_SET_RESPONSE_INVALID_PAIRS', message));

    const { resolver } = this.client.commands;
    const doc = this.client.providers.guilds.fetch(message.guild!.id) || {} as GuildDocument;
    doc.settings = doc.settings || {};
    doc.channels = doc.channels || {};
    doc.dofus = doc.dofus || {};
    const pairs: string[] = [];
    const invalids: string[] = [];

    while (args.keys.length >= 2) {
      const [key, value] = args.keys.splice(0, 2);

      if (key === 'almanax') {
        const channel = await Argument.cast('textChannel', resolver, message, value);

        if (!channel) {
          invalids.push(key);
          continue;
        }

        doc.channels.almanax = channel.id;
        pairs.push(this.t('COMMAND_SET_RESPONSE_PAIR', message, key, `#${channel.name as string}`));
        continue;
      }

      if (key === 'twitter') {
        const channel = await Argument.cast('textChannel', resolver, message, value);

        if (!channel) {
          invalids.push(key);
          continue;
        }

        doc.channels.news = channel.id;
        pairs.push(this.t('COMMAND_SET_RESPONSE_PAIR', message, key, `#${channel.name as string}`));
        continue;
      }

      if (key === 'dofus-server') {
        const server = await Argument.cast('dofusServer', resolver, message, value);

        if (!server) {
          invalids.push(key);
          continue;
        }

        doc.dofus.server = server;
        pairs.push(this.t('COMMAND_SET_RESPONSE_PAIR', message, key, server.name));
        continue;
      }

      invalids.push(key);
    }

    if (invalids.length) void this.warning(message, this.t('COMMAND_SET_RESPONSE_INVALID_VALUES', message, invalids));
    if (!pairs.length) return this.error(message, this.t('COMMAND_SET_RESPONSE_NO_KEYS', message));

    await this.getProvider(message).update(message.guild!.id, doc);
    return this.success(message, this.t('COMMAND_SET_RESPONSE_MODIFIED', message, pairs));
  }

}
