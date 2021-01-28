import { Task } from '@/structures';

/**
 * Deletes logs older than 15 days in the database and
 * clears the cache of saved logs since the process started to free up memory.
 */
export default class LogsPruneTask extends Task {

  public constructor() {
    super('logs', { at: '03:00' });
  }

  /**
   * Runs the task.
   */
  public async exec() {
    this.client.logs.items.clear();

    const delta = Date.now() - (1000 * 60 * 60 * 24 * 15);
    const result = await this.client.logs.model.deleteMany({ timestamp: { $lt: delta } });
    if (!result.deletedCount) return;
    return { deleted: `${result.deletedCount || 0} records` };
  }

}
