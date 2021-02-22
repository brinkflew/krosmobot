import { Message } from 'discord.js';
import { Command } from '@/structures';
import { format } from '@/utils';
import { DEFAULTS } from '@/constants';

/**
 * Creates a new poll.
 */
export default class AboutCommand extends Command {

  public constructor() {
    super('about', {
      description: {
        'short': 'COMMAND_ABOUT_DESCRIPTION_SHORT',
        'extended': 'COMMAND_ABOUT_DESCRIPTION_EXTENDED',
        'example': 'COMMAND_ABOUT_DESCRIPTION_EXAMPLE'
      }
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message) {
    const processUptime = process.uptime();
    const uptime = format(processUptime * 1000, 'relative', this.getLocale(message));
    const version = <string> process.env.npm_package_version;
    const url = <string> process.env.npm_package_repository_url;
    const author = <string> process.env.npm_package_author_name;
    const name = this.client.user?.username || DEFAULTS.CLIENTNAME;
    const { invite } = this.client;

    return this.embed(message, {
      title: message.t('COMMAND_ABOUT_RESPONSE_TITLE', name),
      thumbnail: { url: this.client.user?.avatarURL() || this.client.user?.defaultAvatarURL },
      description: message.t('COMMAND_ABOUT_RESPONSE_DESCRIPTION', name, url),
      fields: [
        {
          name: message.t('COMMAND_ABOUT_RESPONSE_FEATURES_TITLE'),
          value: message.t('COMMAND_ABOUT_RESPONSE_FEATURES_CONTENT', invite)
        },
        {
          name: message.t('COMMAND_ABOUT_RESPONSE_INVITE_TITLE'),
          value: message.t('COMMAND_ABOUT_RESPONSE_INVITE_CONTENT', invite)
        },
        {
          name: message.t('COMMAND_ABOUT_RESPONSE_SUPPORT_TITLE'),
          value: message.t('COMMAND_ABOUT_RESPONSE_SUPPORT_CONTENT')
        }
      ],
      footer: {
        text: message.t('COMMAND_ABOUT_RESPONSE_UPTIME', version, uptime, author)
      }
    });
  }

}
