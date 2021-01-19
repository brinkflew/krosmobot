import { AkairoModule } from 'discord-akairo';
import { Guild } from 'discord.js';
import { TaskOptions } from 'types';

/**
 * A simple task that get executed repeatedly at an interval
 * or once at a given timestamp.
 */
export class Task extends AkairoModule {

  public interval?: number;
  public timestamp?: number;
  public at?: string;
  public last: number;
  public enabled: boolean;

  public constructor(id: string, options: TaskOptions = {}) {
    super(id, options);

    let interval = process.env.KROSMOBOT_TASKS_INTERVAL || 60;
    if (typeof interval === 'string') interval = parseInt(interval, 10);

    this.interval = options.interval
      ? Math.max(options.interval, interval)
      : interval;
    this.interval *= 1000;
    this.timestamp = options.interval ? 0 : options.timestamp;
    this.last = 0;
    this.at = options.at;
    this.enabled = typeof options.enabled === 'boolean' ? options.enabled : true;

    if (this.at) {
      const timing = this.at.split(':');
      let date = new Date();
      date = new Date(date.setDate(date.getDate() - 1));
      date = new Date(date.setHours(parseInt(timing[0], 10)));
      date = new Date(date.setMinutes(parseInt(timing[1], 10)));
      this.last = date.setSeconds(0);
      this.interval = 1000 * 60 * 60 * 24;
    }
  }

  /**
   * Fetches the correct translation for the guild a message will be sent to.
   * @param key Key for the translation to fetch
   * @param message Guild to which to send a message
   * @param args Parameters to pass to the translation
   */
  public translate(key: string, guild: Guild, ...args: any[]): string {
    const language = <string> this.client.providers.guilds.get(guild.id, 'settings', {}).locale || process.env.KROSMOBOT_DEFAULT_LANGUAGE || 'en';
    const locale = this.client.locales.get(language);
    return locale.translate(key, ...args);
  }

  /**
   * Fetches the correct translation for the guild a message will be sent to.
   * This is a shortand for `Task#translate()`.
   * @param key Key for the translation to fetch
   * @param message Guild to which to send a message
   * @param args Parameters to pass to the translation
   */
  public t(key: string, guild: Guild, ...args: any[]): string {
    return this.translate(key, guild, ...args);
  }

  /**
   * Runs the task.
   */
  public exec() {
    throw Error('Not implemented');
  }

}
