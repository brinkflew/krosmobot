import { Command } from '@/structures';
import { Message } from 'discord.js';
import { Argument } from 'discord-akairo';
import { DEFAULTS } from '@/constants';

/**
 * Change the localization options for the current guild.
 */
export default class LocaleCommand extends Command {

  public constructor() {
    super('locale', {
      aliases: ['language', 'lang'],
      userPermissions: ['MANAGE_GUILD'],
      description: {
        'short': 'COMMAND_LOCALE_DESCRIPTION_SHORT',
        'extended': 'COMMAND_LOCALE_DESCRIPTION_EXTENDED',
        'example': 'COMMAND_LOCALE_DESCRIPTION_EXAMPLE',
        'usage': 'COMMAND_LOCALE_DESCRIPTION_USAGE'
      }
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, args: { [key: string]: string | null }): Promise<Message> {
    const provider = this.getProvider(message);
    const id = this.getID(message);

    // Reset the default locale
    if (!args.locale) {
      await provider.update(id, { settings: { locale: DEFAULTS.LOCALE } });
      const language = this.t(`LANG_${DEFAULTS.LOCALE.toUpperCase()}`, message);
      return this.success(message, this.t('COMMAND_LOCALE_RESPONSE_RESET', message, language));
    }

    // Chek if the locale actually exists
    if (!this.client.locales.has(args.locale)) {
      return this.error(message, this.t('COMMAND_LOCALE_RESPONSE_UNKNOWN', message, args.locale));
    }

    const languageName = this.t(`LANG_${args.locale.toUpperCase()}`, message);

    // Check if the locale actually changes
    const language = <string> provider.fetch(id)?.settings?.locale;
    if (language === args.locale) return this.warning(message, this.t('COMMAND_LOCALE_RESPONSE_IDENTICAL', message, languageName));

    // Save the new locale
    await provider.update(id, { settings: { locale: args.locale } });
    return this.success(message, this.t('COMMAND_LOCALE_RESPONSE_MODIFIED', message, languageName));
  }

  /**
   * Construct a selection of possible values for the arguments
   * based on the locales currently loaded.
   */
  // @ts-ignore unused-declaration
  private *args() {
    const locales = this.client.locales.modules.keyArray();
    const locale = yield Argument.validate(locales, (_message: Message, _phrase: string, value: any) => locales.includes(value));
    return { locale };
  }

}
