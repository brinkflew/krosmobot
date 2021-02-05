import { Listener } from 'discord-akairo';
import { GuildMember } from 'discord.js';
import { Logger } from '@/structures';

/**
 * Does something when a user leaves a guild.
 */
export default class extends Listener {

  public constructor() {
    super('client-guild-member-remove', {
      emitter: 'client',
      event: 'guildMemberRemove'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(member: GuildMember) {
    this.client.metrics.dec('discord.users');
    this.client.logger.debug(Logger.format(
      'discord',
      'member-left',
      {
        member: member.id,
        guild: member.guild.id
      }
    ));
  }

}
