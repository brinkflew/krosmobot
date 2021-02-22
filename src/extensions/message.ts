import { Structures, Message } from 'discord.js';
import { DEFAULTS } from '@/constants';

// eslint-disable-next-line @typescript-eslint/naming-convention
Structures.extend('Message', (C: typeof Message) => class extends C {

  /**
   * Fetches the correct translation for this message.
   * @param key Key for the translation to fetch
   * @param args Parameters to pass to the translation
   */
  public translate(key: string, ...args: any[]): string {
    return this.locale.translate(key, ...args);
  }

  /**
   * Fetches the correct translation for this message.
   * This is a shortand for `Message#translate()`.
   * @param key Key for the translation to fetch
   * @param args Parameters to pass to the translation
   */
  public t(key: string, ...args: any[]): string {
    return this.translate(key, ...args);
  }

  /**
   * The provider that manages settigns for this message.
   */
  public get provider() {
    return this.guild
      ? this.client.providers.guilds
      : this.client.providers.users;
  }

  /**
   * The documents containing stored information for this message's
   * guild or author.
   */
  public get document() {
    const id = this.guild
      ? this.guild.id
      : this.author.id;
    return this.provider.fetch(id);
  }

  /**
   * Settings for this message's guild or author.
   */
  public get settings() {
    return this.document?.settings;
  }

  /**
   * The locale to use with this message.
   */
  public get locale() {
    const language = this.settings?.locale || DEFAULTS.LOCALE;
    return this.client.locales.get(language);
  }

});
