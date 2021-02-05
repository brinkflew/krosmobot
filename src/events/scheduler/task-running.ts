import { Listener } from 'discord-akairo';
import { Task, Logger } from '@/structures';

/**
 * Emitted whenever a message is created.
 */
export default class extends Listener {

  public constructor() {
    super('scheduler-task-running', {
      emitter: 'scheduler',
      event: 'task-running'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(task: Task) {
    this.client.metrics.inc('discord.tasks.queued');
    this.client.logger.debug(Logger.format('scheduler', 'task-running', undefined, task.id));
  }

}
