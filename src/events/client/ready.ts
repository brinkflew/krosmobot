import { Listener } from 'discord-akairo';

/**
 * Does something once the client is ready.
 */
export default class extends Listener {
  constructor() {
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
    this.client.logger.info(`Watching ${this.client.guilds.cache.size} channels`);
    this.client.logger.info(`Listening to ${this.client.users.cache.size} users`);
    this.client.logger.info(`Loaded ${this.client.commands.modules.size} commands`);
    this.client.logger.info(`Loaded ${this.client.scheduler.modules.size} tasks`);
    this.client.logger.info(`Loaded ${this.client.locales.modules.size} locales`);
  }
}
