import { Listener } from 'discord-akairo';
import { GuildEmoji } from 'discord.js';
import { oneLine } from 'common-tags';

/**
 * Does something when the client updates a guild emoji.
 */
export default class extends Listener {
  constructor() {
    super('client-emoji-update', {
      emitter: 'client',
      event: 'emojiUpdate'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(oldEmoji: GuildEmoji, newEmoji: GuildEmoji) {
    this.client.logger.verbose(oneLine`
      Updated emoji ${oldEmoji.name} (${oldEmoji.identifier}) in guild ${oldEmoji.guild}
      -> ${newEmoji.name} (${newEmoji.identifier})
    `);
  }
}
