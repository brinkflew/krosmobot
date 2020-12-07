import { Listener } from 'discord-akairo';
import { Task } from '@/structures';

/**
 * Emitted whenever a message is created.
 */
export default class extends Listener {

  public constructor() {
    super('client-task', {
      emitter: 'client',
      event: 'task'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(task: Task) {
    this.client.logger.debug(`Running task '${task.id}'`);
  }

}
