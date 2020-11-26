import { Listener } from 'discord-akairo';

/**
 * Emitted when a shard resumes successfully.
 */
export default class extends Listener {
  constructor() {
    super('client-shard-resume', {
      emitter: 'client',
      event: 'shardResume'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(id: number) {
    this.client.logger.success(`Shard ${id} resumed successfuly`);
  }
}
