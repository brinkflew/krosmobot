import { Listener } from 'discord-akairo';
import { GuildMember } from 'discord.js';
import { Logger } from '@/structures';

/**
 * Does something when a member of a guild is updated.
 */
export default class extends Listener {

  public constructor() {
    super('client-guild-member-update', {
      emitter: 'client',
      event: 'guildMemberUpdate'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(oldMember: GuildMember, newMember: GuildMember) {
    this.client.logger.verbose(Logger.format(
      'discord',
      'member-updated',
      { guild: `${oldMember.id} -> ${newMember.id}` }
    ));

    if (oldMember.id === newMember.id) return;
    void this.client.providers.guilds.set(oldMember.id, 'id', `${newMember.guild.id}:${newMember.id}`);
  }

}
