import {
  AkairoClient,
  AkairoHandler,
  AkairoHandlerOptions
} from 'discord-akairo';
import {Collection } from 'discord.js';
import { Task } from '@/structures';

/**
 * Handles tasks scheduling and execution.
 * @param client Client to attach to
 * @param options Options for the handler
 */
export class TaskHandler extends AkairoHandler {
  public modules!: Collection<string, Task>;
  public interval: number = 60;

  constructor(client: AkairoClient, options: AkairoHandlerOptions = {}) {
    super(client, {
      directory: options.directory,
      classToHandle: Task
    });
  }

  /**
   * Initializes the scheduler.
   */
  public init() {
    setInterval(() => this.execTasks(), this.interval * 1000);
  }

  /**
   * Execute all tasks that needs to be run.
   */
  private execTasks(): void {
    for (const [_, task] of this.modules) {
      if (task.timestamp && task.last) continue;
      if (task.interval && Date.now() - task.last < task.interval) continue;
      task.last = Date.now();
      task.exec();
    }
  }

  /**
   * Checks if a task exists and is loaded.
   * @param id ID of the task to find
   */
  public has(id: string): boolean {
    return this.modules.has(id);
  }

  /**
   * Finds a task based on its ID.
   * @param id ID of the task
   */
  public get(id: string): Task {
    const task = this.modules.get(id);
    if (task) return task;
    throw new Error(`Invalid task: '${id}'`);
  }
}
