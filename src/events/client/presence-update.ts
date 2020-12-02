import { Listener } from 'discord-akairo';
import { Presence } from 'discord.js';
import { oneLine } from 'common-tags';

/**
 * Emitted whenever a guild member's presence (e.g. status, activity) is changed.
 */
export default class extends Listener {

  public constructor() {
    super('client-presence-update', {
      emitter: 'client',
      event: 'presenceUpdate'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(oldPresence: Presence | undefined, newPresence: Presence) {
    this.client.logger.verbose(oneLine`
      Presence status changed for
      ${newPresence.member
    ? `member ${newPresence.member.id} in guild ${newPresence.guild!.id}`
    : `user ${newPresence.user!.id}`}
      ${oldPresence?.status ? oldPresence.status : 'unknown'}
      -> ${newPresence.status}
    `);
  }

}
