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
        'example': 'COMMAND_LOCALE_DESCRIPTION_EXAMPLE'
      },
      usage: [
        {
          id: 'locale',
          description: 'COMMAND_LOCALE_DESCRIPTION_ARGUMENT_LOCALE'
        }
      ]
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
      return this.success(message, message.t('COMMAND_LOCALE_RESPONSE_RESET', language));
    }

    // Chek if the locale actually exists
    if (!this.client.locales.has(args.locale)) {
      return this.error(message, message.t('COMMAND_LOCALE_RESPONSE_UNKNOWN', args.locale));
    }

    const languageKey = `LANG_${args.locale.toUpperCase()}`;
    let languageName = this.t(languageKey, message);

    // Check if the locale actually changes
    const language = <string> provider.fetch(id)?.settings?.locale;
    if (language === args.locale) return this.warning(message, message.t('COMMAND_LOCALE_RESPONSE_IDENTICAL', languageName));

    // Save the new locale
    languageName = this.client.locales.get(args.locale).translate(languageKey);
    await provider.update(id, { settings: { locale: args.locale } });
    return this.success(message, message.t('COMMAND_LOCALE_RESPONSE_MODIFIED', languageName));
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
