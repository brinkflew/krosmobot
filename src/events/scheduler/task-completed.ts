import { Listener } from 'discord-akairo';
import { Task, Logger } from '@/structures';

/**
 * Emitted whenever a message is created.
 */
export default class extends Listener {

  public constructor() {
    super('scheduler-task-completed', {
      emitter: 'scheduler',
      event: 'task-completed'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(task: Task) {
    this.client.logger.debug(Logger.format('scheduler', 'task-completed', undefined, task.id));
  }

}
