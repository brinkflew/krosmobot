import { Listener } from 'discord-akairo';
import { GuildMember } from 'discord.js';

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
    this.client.logger.info(`Member ${member.id} left guild ${member.guild.id}`);
  }

}
