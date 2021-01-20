import { Listener } from 'discord-akairo';
import { Logger } from '@/structures';
import metrics from '@/metrics';

/**
 * Emitted when a shard resumes successfully.
 */
export default class extends Listener {

  public constructor() {
    super('client-shard-resume', {
      emitter: 'client',
      event: 'shardResume'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(id: number, attempts: number) {
    this.client.logger.success(Logger.format(
      `discord: shard ${id}`,
      'shard-resumed',
      { attempts }
    ));
    metrics.discord.shards.inc();
  }

}
