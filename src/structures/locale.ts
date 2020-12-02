import { AkairoModule } from 'discord-akairo';
import { LocaleOptions, LocaleString } from 'types/types';

/**
 * Store and/or build translations of messages in a specific language.
 */
export class Locale extends AkairoModule {

  public language: string;
  protected strings: { [key: string]: LocaleString };

  public constructor(id: string, options: LocaleOptions = {}) {
    super(id, options);
    this.language = options.language || id;
    this.strings = {};
  }

  /**
   * Fetches the translation of a key.
   * @param key Identifier of the string to get the translation of
   * @param args Arguments to pass to the string building function
   */
  public translate(key: string, ...args: any[]): string {
    const translated = this.strings[key];

    if (!translated) {
      if (!this.strings.DEFAULT) throw Error(`Missing default translation key for locale '${this.id}'`);
      return this.ensureTranslated(this.strings.DEFAULT, key);
    }

    return this.ensureTranslated(translated, ...args);
  }

  /**
   * Makes sure the translation is a string (executes the function if necessary).
   * @param translation Locale string
   * @param args Parameters to pass to the translation if it is a function
   */
  private ensureTranslated(translation: LocaleString, ...args: any[]): string {
    return typeof translation === 'string' ? translation : translation(...args);
  }

}
