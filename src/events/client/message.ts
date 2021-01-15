import { Listener } from 'discord-akairo';
import { Message, Guild } from 'discord.js';
import { oneLine } from 'common-tags';
import metrics from '@/metrics';
import { DEFAULT_LOCALE } from '@/constants';

/**
 * Emitted whenever a message is created.
 */
export default class extends Listener {

  public constructor() {
    super('client-message', {
      emitter: 'client',
      event: 'message'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public async exec(message: Message) {
    this.client.logger.verbose(oneLine`
      Message ${message.author.id === this.client.user?.id ? 'sent to' : `received from ${message.author.id} in`}
      channel ${message.channel}
    `);

    metrics.discord.messages.mark();

    const holder = message.guild || message.author;
    const { providers } = this.client;
    const provider = holder instanceof Guild ? providers.guilds : providers.users;
    const settings = provider.get(holder.id, 'settings', {});
    settings.rive = settings.rive || {};

    if (!settings.rive.enabled) return;
    if (Math.random() >= (settings.rive.rate || 1)) return;

    const language = <string> provider.get(holder.id, 'locale', process.env.KROSMOBOT_DEFAULT_LANGUAGE || DEFAULT_LOCALE);
    const brain = this.client.rivebots.get(language);

    const reply = await brain.reply(message.author.id, message.cleanContent);
    if (reply === 'ERR: No Reply Matched') return;
    void message.util?.send(reply);
  }

}
