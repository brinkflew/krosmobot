import { Command } from '@/structures';
import { Message, TextChannel } from 'discord.js';
import { Argument } from 'discord-akairo';

/**
 * Repeat a message, possibly in another channel.
 */
export default class PingCommand extends Command {

  public constructor() {
    super('echo', {
      aliases: ['say', 'send', 'message'],
      channel: 'guild',
      description: {
        'short': 'COMMAND_ECHO_DESCRIPTION_SHORT',
        'extended': 'COMMAND_ECHO_DESCRIPTION_EXTENDED',
        'example': 'COMMAND_ECHO_DESCRIPTION_EXAMPLE',
        'usage': 'COMMAND_ECHO_DESCRIPTION_USAGE'
      },
      args: [
        {
          id: 'target',
          type: Argument.union('textChannel', 'string')
        },
        {
          'id': 'file',
          'match': 'option',
          'type': 'url',
          'flag': 'file:',
          'default': null
        },
        {
          id: 'content',
          match: 'rest',
          type: 'string'
        }
      ]
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, { target, file, content }: { target: TextChannel | string; file: URL; content: string }) {
    if (typeof target === 'string') {
      content = `${target} ${content}`;
      target = <TextChannel>message.channel;
    }

    const files = [];
    if (file) files.push(file.href);

    void target.send(content, { files });
    return this.success(message, this.t('COMMAND_ECHO_RESPONSE_SENT', message, target.name));
  }

}
