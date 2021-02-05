import { Listener } from 'discord-akairo';
import { Logger } from '@/structures';

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
    this.client.logger.success(Logger.format(
      'discord',
      'ready',
      {
        guilds: this.client.guilds.cache.size,
        channels: this.client.channels.cache.size,
        users: this.client.userCount,
        commands: this.client.commands.modules.size,
        tasks: this.client.scheduler.modules.size,
        locales: this.client.locales.modules.size
      }
    ));
  }

}
