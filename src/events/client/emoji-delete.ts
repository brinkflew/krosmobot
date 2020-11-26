import { Listener } from 'discord-akairo';
import { GuildEmoji } from 'discord.js';

/**
 * Does something when the client deletes a guild emoji.
 */
export default class extends Listener {
  constructor() {
    super('client-emoji-delete', {
      emitter: 'client',
      event: 'emojiDelete'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(emoji: GuildEmoji) {
    this.client.logger.verbose(
      `Deleted emoji '${emoji.name}' (${emoji.identifier}) in guild ${emoji.guild}`
    );
  }
}
