import { Listener } from 'discord-akairo';
import { Guild, User } from 'discord.js';

/**
 * Does something when the client bans a user from a guild.
 */
export default class extends Listener {
  constructor() {
    super('client-guild-ban-add', {
      emitter: 'client',
      event: 'guildBanAdd'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(guild: Guild, user: User) {
    this.client.logger.info(`Banned user ${user} from guild ${guild}`);
  }
}
