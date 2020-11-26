import { Listener } from 'discord-akairo';
import { GuildMember } from 'discord.js';
import { oneLine } from 'common-tags';

/**
 * Does something when a member of a guild is updated.
 */
export default class extends Listener {
  constructor() {
    super('client-guild-member-update', {
      emitter: 'client',
      event: 'guildMemberUpdate'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(oldMember: GuildMember, newMember: GuildMember) {
    this.client.logger.verbose(oneLine`
      Member ${oldMember} details where updated in guild ${oldMember.guild}
      -> ${newMember}
    `);
  }
}
