import { Listener } from 'discord-akairo';
import { GuildEmoji } from 'discord.js';

/**
 * Does something when the client creates a guild emoji.
 */
export default class extends Listener {
  constructor() {
    super('client-emoji-create', {
      emitter: 'client',
      event: 'emojiCreate'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(emoji: GuildEmoji) {
    this.client.logger.verbose(`Created emoji '${emoji.name}' (${emoji.identifier}) in guild ${emoji.guild}`);
  }
}
