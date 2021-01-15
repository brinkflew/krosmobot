import { resolve, join } from 'path';
import { AkairoModule } from 'discord-akairo';
import RiveScript from 'rivescript';
import { RivebotOptions } from 'types';

/**
 * Implements a rivescript client to interract in regular conversations.
 */
export class Rivebot extends AkairoModule {

  public language: string;
  public brain: RiveScript;

  public constructor(id: string, options: RivebotOptions = {}) {
    super(id, options);
    this.language = options.language || id;
    this.brain = new RiveScript({ utf8: true });
  }

  /**
   * Load brain files and train the rivebot.
   */
  public async init() {
    try {
      await this.brain.loadDirectory(resolve(join(__dirname, '..', '..', 'brains', this.language)));
      this.brain.sortReplies();
    } catch (error) {
      this.client.logger.error(error);
    }
  }

  /**
   * Helper method to get a reply to a text.
   * @param user Username to remember or fetch data for
   * @param phrase Message to reply to
   */
  public async reply(user: string, phrase: string) {
    return this.brain.reply(user, phrase);
  }

}
