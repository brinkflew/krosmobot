import { Message } from 'discord.js';
import { Command } from '@/structures';
import { format } from '@/utils';

/**
 * Get the latency between the user and the client,
 * and between the client and the Discord servers
 */
export default class MonitCommand extends Command {

  public constructor() {
    super('monit', {
      aliases: ['monitor', 'bot-stats'],
      channel: 'dm',
      ownerOnly: true,
      description: {
        'short': 'COMMAND_MONIT_DESCRIPTION_SHORT',
        'extended': 'COMMAND_MONIT_DESCRIPTION_EXTENDED',
        'example': 'COMMAND_MONIT_DESCRIPTION_EXAMPLE'
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
    const nodeVersion = process.version;
    const { arch, pid, platform } = process;
    const { rss } = process.memoryUsage();
    const { userCPUTime, systemCPUTime } = process.resourceUsage();
    const load = (userCPUTime + systemCPUTime) / (processUptime * 10e6) * 100;
    const latency = Math.ceil(this.client.metrics.get('discord.latency').value || 0);
    const shards = this.client.metrics.get('discord.shards').last;

    /* eslint-disable @typescript-eslint/naming-convention */
    const {
      npm_package_version,
      npm_package_name,
      npm_package_repository_url
    } = process.env;
    /* eslint-enable @typescript-eslint/naming-convention */

    const embed = this.craftEmbed(message, {
      author: {
        name: this.t('COMMAND_MONIT_RESPONSE_TITLE', message, (<string> this.client.user?.username), (<string> npm_package_version)),
        iconURL: this.client.user?.avatarURL() || this.client.user?.defaultAvatarURL,
        url: npm_package_repository_url
      },
      fields: [
        {
          name: message.t('COMMAND_MONIT_RESPONSE_ARCH_TITLE'),
          value: message.t('COMMAND_MONIT_RESPONSE_ARCH_VALUE', nodeVersion, platform, arch)
        },
        {
          name: message.t('COMMAND_MONIT_RESPONSE_PROCESS_TITLE'),
          value: this.t('COMMAND_MONIT_RESPONSE_PROCESS_VALUE', message, npm_package_name, pid),
          inline: true
        },
        {
          name: message.t('COMMAND_MONIT_RESPONSE_RESOURCES_TITLE'),
          value: this.t('COMMAND_MONIT_RESPONSE_RESOURCES_VALUE', message, load.toFixed(2), (rss / 1e6).toFixed(2)),
          inline: true
        },
        {
          name: message.t('COMMAND_MONIT_RESPONSE_DISCORD_TITLE'),
          value: message.t('COMMAND_MONIT_RESPONSE_DISCORD_VALUE', latency, shards),
          inline: true
        }
      ],
      footer: {
        text: message.t('COMMAND_MONIT_RESPONSE_UPTIME', uptime)
      }
    });

    return message.channel.send(embed);
  }

}
