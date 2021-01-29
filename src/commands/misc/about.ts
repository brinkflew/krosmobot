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
        'example': 'COMMAND_ABOUT_DESCRIPTION_EXAMPLE',
        'usage': 'COMMAND_ABOUT_DESCRIPTION_USAGE'
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
      title: this.t('COMMAND_ABOUT_RESPONSE_TITLE', message, name),
      thumbnail: { url: this.client.user?.avatarURL() || this.client.user?.defaultAvatarURL },
      description: this.t('COMMAND_ABOUT_RESPONSE_DESCRIPTION', message, name, url),
      fields: [
        {
          name: this.t('COMMAND_ABOUT_RESPONSE_FEATURES_TITLE', message),
          value: this.t('COMMAND_ABOUT_RESPONSE_FEATURES_CONTENT', message, invite)
        },
        {
          name: this.t('COMMAND_ABOUT_RESPONSE_INVITE_TITLE', message),
          value: this.t('COMMAND_ABOUT_RESPONSE_INVITE_CONTENT', message, invite)
        },
        {
          name: this.t('COMMAND_ABOUT_RESPONSE_SUPPORT_TITLE', message),
          value: this.t('COMMAND_ABOUT_RESPONSE_SUPPORT_CONTENT', message)
        }
      ],
      footer: {
        text: this.t('COMMAND_ABOUT_RESPONSE_UPTIME', message, version, uptime, author)
      }
    });
  }

}
