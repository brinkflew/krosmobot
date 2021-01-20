import { Listener } from 'discord-akairo';
import { GuildMember } from 'discord.js';
import metrics from '@/metrics';
import { Logger } from '@/structures';

/**
 * Does something when a user joins a guild.
 */
export default class extends Listener {

  public constructor() {
    super('client-guild-member-add', {
      emitter: 'client',
      event: 'guildMemberAdd'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(member: GuildMember) {
    const { users } = metrics.discord;
    users.set(users.val() + 1);
    this.client.logger.debug(Logger.format(
      'discord',
      'member-joined',
      {
        member: member.id,
        guild: member.guild.id
      }
    ));
  }

}
