import { Listener } from 'discord-akairo';
import metrics from '@/metrics';

/**
 * Does something once the client is ready.
 */
export default class extends Listener {

  public constructor() {
    super('client-ready', {
      emitter: 'client',
      event: 'ready'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec() {
    this.client.logger.success('Client ready');

    this.client.logger.info(`Active in ${this.client.guilds.cache.size} guilds`);
    metrics.discord.guilds.set(this.client.guilds.cache.size);

    this.client.logger.info(`Watching ${this.client.channels.cache.size} channels`);
    metrics.discord.channels.set(this.client.channels.cache.size);

    this.client.logger.info(`Listening to ${this.client.users.cache.size} users`);
    metrics.discord.users.set(this.client.users.cache.size);

    this.client.logger.info(`Loaded ${this.client.commands.modules.size} commands`);
    this.client.logger.info(`Loaded ${this.client.scheduler.modules.size} tasks`);
    this.client.logger.info(`Loaded ${this.client.locales.modules.size} locales`);
  }

}
