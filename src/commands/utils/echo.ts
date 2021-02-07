import { Command } from '@/structures';
import { Message, TextChannel } from 'discord.js';
import { Argument } from 'discord-akairo';

/**
 * Repeat a message, possibly in another channel.
 */
export default class EchoCommand extends Command {

  public constructor() {
    super('echo', {
      aliases: ['say', 'send', 'message'],
      channel: 'guild',
      description: {
        'short': 'COMMAND_ECHO_DESCRIPTION_SHORT',
        'extended': 'COMMAND_ECHO_DESCRIPTION_EXTENDED',
        'example': 'COMMAND_ECHO_DESCRIPTION_EXAMPLE'
      },
      args: [
        {
          id: 'target',
          type: Argument.union('textChannel', 'string'),
          description: 'COMMAND_ECHO_DESCRIPTION_ARGUMENT_TARGET'
        },
        {
          id: 'file',
          match: 'option',
          type: 'url',
          flag: '--file',
          description: 'COMMAND_ECHO_DESCRIPTION_ARGUMENT_FILE'
        },
        {
          id: 'content',
          match: 'rest',
          type: 'string',
          description: 'COMMAND_ECHO_DESCRIPTION_ARGUMENT_CONTENT'
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
      content = content ? `${target} ${content}` : target;
      target = <TextChannel> message.channel;
    }

    if (!content) return this.warning(message, this.t('COMMAND_ECHO_RESPONSE_NO_CONTENT', message));

    const files = [];
    if (file) files.push(file.href);

    if (target.id !== message.channel.id) void this.success(message, this.t('COMMAND_ECHO_RESPONSE_SENT', message, target.name));
    return target.send(content, { files });
  }

}
