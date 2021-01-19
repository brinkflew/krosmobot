import { Listener } from 'discord-akairo';
import { Presence } from 'discord.js';
import { Logger } from '@/structures';

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
    const params: { [key: string]: string } = {
      status: `${oldPresence?.status || 'unknown'} -> ${newPresence.status}`
    };

    if (newPresence.member && newPresence.guild) {
      params.member = newPresence.member.id;
      params.guild = newPresence.guild.id;
    } else if (newPresence.user) {
      params.user = newPresence.user.id;
    }

    this.client.logger.verbose(Logger.format(
      'discord',
      'presence-updated',
      params
    ));
  }

}
