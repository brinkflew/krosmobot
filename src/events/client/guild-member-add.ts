import { Listener } from 'discord-akairo';
import { GuildMember } from 'discord.js';

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
    this.client.logger.info(`Member ${member.id} joined guild ${member.guild.id}`);
  }

}
