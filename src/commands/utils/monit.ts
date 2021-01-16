import { Message } from 'discord.js';
import { Command } from '@/structures';
import { format } from '@/utils';
import metrics from '@/metrics';

/**
 * Get the latency between the user and the client,
 * and between the client and the Discord servers
 */
export default class PingCommand extends Command {

  public constructor() {
    super('monit', {
      aliases: ['monitor', 'bot-stats'],
      channel: 'dm',
      ownerOnly: true,
      description: {
        'short': 'COMMAND_MONIT_DESCRIPTION_SHORT',
        'extended': 'COMMAND_MONIT_DESCRIPTION_EXTENDED',
        'example': 'COMMAND_MONIT_DESCRIPTION_EXAMPLE',
        'usage': 'COMMAND_MONIT_DESCRIPTION_USAGE'
      }
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message) {
    const settings = message.guild || message.author;
    const language = <string> this.get(settings, 'locale', process.env.KROSMOBOT_DEFAULT_LANGUAGE || 'en');
    const locale = this.client.locales.get(language);

    const processUptime = process.uptime();
    const uptime = format(processUptime * 1000, 'relative', locale);
    const nodeVersion = process.version;
    const { arch, pid, platform } = process;
    const { rss } = process.memoryUsage();
    const { userCPUTime, systemCPUTime } = process.resourceUsage();
    const load = (userCPUTime + systemCPUTime) / (processUptime * 10e6) * 100;
    const { heartbeat, shards } = metrics.discord;

    /* eslint-disable @typescript-eslint/naming-convention */
    const {
      npm_package_version,
      npm_package_name,
      npm_package_repository_url
    } = process.env;
    /* eslint-enable @typescript-eslint/naming-convention */

    return this.embed(message, {
      author: {
        name: this.t('COMMAND_MONIT_RESPONSE_TITLE', message, (<string> this.client.user?.username), (<string> npm_package_version)),
        iconURL: this.client.user?.avatarURL() || this.client.user?.defaultAvatarURL,
        url: npm_package_repository_url
      },
      fields: [
        {
          name: this.t('COMMAND_MONIT_RESPONSE_ARCH_TITLE', message),
          value: this.t('COMMAND_MONIT_RESPONSE_ARCH_VALUE', message, nodeVersion, platform, arch)
        },
        {
          name: this.t('COMMAND_MONIT_RESPONSE_PROCESS_TITLE', message),
          value: this.t('COMMAND_MONIT_RESPONSE_PROCESS_VALUE', message, npm_package_name, pid),
          inline: true
        },
        {
          name: this.t('COMMAND_MONIT_RESPONSE_RESOURCES_TITLE', message),
          value: this.t('COMMAND_MONIT_RESPONSE_RESOURCES_VALUE', message, load.toFixed(2), (rss / 1e6).toFixed(2)),
          inline: true
        },
        {
          name: this.t('COMMAND_MONIT_RESPONSE_DISCORD_TITLE', message),
          value: this.t('COMMAND_MONIT_RESPONSE_DISCORD_VALUE', message, heartbeat.val(), shards.val()),
          inline: true
        }
      ],
      footer: {
        text: this.t('COMMAND_MONIT_RESPONSE_UPTIME', message, uptime)
      }
    });
  }

}
