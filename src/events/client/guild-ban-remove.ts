import { Listener } from 'discord-akairo';
import { Guild, User } from 'discord.js';

/**
 * Does something when the client un-bans a user from a guild.
 */
export default class extends Listener {

  public constructor() {
    super('client-guild-ban-remove', {
      emitter: 'client',
      event: 'guildBanRemove'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(guild: Guild, user: User) {
    this.client.logger.info(`Un-banned user ${user} from guild ${guild}`);
  }

}
