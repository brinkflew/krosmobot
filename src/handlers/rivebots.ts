import {
  AkairoClient,
  AkairoHandler,
  AkairoHandlerOptions
} from 'discord-akairo';
import { Collection } from 'discord.js';
import { Rivebot } from '@/structures';

/**
 * Handles regular conversations.
 * @param client Client to attach to
 * @param options Options for the handler
 */
export class RivebotHandler extends AkairoHandler {

  public modules!: Collection<string, Rivebot>;

  public constructor(client: AkairoClient, options: AkairoHandlerOptions = {}) {
    super(client, {
      directory: options.directory,
      classToHandle: Rivebot
    });
  }

  /**
   * Initializes all loaded rivebots.
   */
  public init() {
    this.modules.array().forEach(rivebot => void rivebot.init());
  }

  /**
   * Checks if a rivebot exists and is loaded.
   * @param id ID of the rivebot to search
   */
  public has(id: string): boolean {
    return this.modules.has(id);
  }

  /**
   * Finds a rivebot based on its ID.
   * @param id ID of the rivebot
   */
  public get(id: string): Rivebot {
    const locale = this.modules.get(id);
    if (locale) return locale;
    throw new Error(`Invalid rivebot: '${id}'`);
  }

}
