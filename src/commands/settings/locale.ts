import { Command } from '@/structures';
import { Message } from 'discord.js';
import { Argument } from 'discord-akairo';

/**
 * Change the localization options for the current guild.
 */
export default class LocaleCommand extends Command {
  constructor() {
    super('locale', {
      aliases: ['language', 'lang'],
      userPermissions: ['MANAGE_GUILD']
    });
  }

  /**
   * Construct a selection of possible values for the arguments
   * based on the locales currently loaded.
   */
  *args() {
    const locales = this.client.locales.modules.keyArray();
    const locale = yield Argument.validate(locales,
      (_message: Message, _phrase: string, value: any) => locales.includes(value)
    );
    return { locale };
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, { locale }: any): Promise<Message> {
    try {
      const settings = message.guild || message.author;
      const defaultLocale = process.env.KROSMOBOT_LOCALE || 'en';

      // Reset the default locale
      if (!locale) {
        await this.set(settings, 'locale', defaultLocale);
        const language = this.t(`LANG_${defaultLocale.toUpperCase()}`, message);
        return this.success(message, this.t('COMMAND_LOCALE_RESPONSE_RESET', message, language));
      }

      // Chek if the locale actually exists
      if (!this.client.locales.has(locale))
        return this.error(message, this.t('COMMAND_LOCALE_RESPONSE_UNKNOWN', message, locale));

      // Check if the locale actually changes
      let oldLocale = this.get(settings, 'locale', defaultLocale);
      if (oldLocale === locale) {
        const language = this.t(`LANG_${oldLocale.toUpperCase()}`, message);
        return this.warning(message, this.t('COMMAND_LOCALE_RESPONSE_IDENTICAL', message, language));
      }
      
      // Save the new locale
      await this.set(settings, 'locale', locale);
      const language = this.t(`LANG_${locale.toUpperCase()}`, message);
      return this.success(message, this.t('COMMAND_LOCALE_RESPONSE_MODIFIED', message, language));
    } catch (error) {
      return this.error(message, this.t('COMMAND_LOCALE_RESPONSE_ERROR', message));
    }
  }
}
