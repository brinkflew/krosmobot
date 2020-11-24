import {
  AkairoClient,
  AkairoHandler,
  AkairoHandlerOptions
} from 'discord-akairo';
import {Collection } from 'discord.js';
import { Locale } from '@/structures';

/**
 * Handles languages and translations accross the client.
 * @param client Client to attach to
 * @param options Options for the handler
 */
export class LocaleHandler extends AkairoHandler {
  public modules!: Collection<string, Locale>;

  constructor(client: AkairoClient, options: AkairoHandlerOptions = {}) {
    super(client, {
      directory: options.directory,
      classToHandle: Locale
    });
  }

  /**
   * Checks if a locale exists and is loaded.
   * @param id ID of the locale to search
   */
  public has(id: string): boolean {
    return this.modules.has(id);
  }

  /**
   * Finds a locale based on its ID.
   * @param id ID of the locale
   */
  public get(id: string): Locale {
    const locale = this.modules.get(id);
    if (locale) return locale;
    throw new Error(`Invalid locale: '${id}'`);
  }
}
