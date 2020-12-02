import { AkairoModule } from 'discord-akairo';
import { TaskOptions } from 'types/types';

/**
 * A simple task that get executed repeatedly at an interval
 * or once at a given timestamp.
 */
export class Task extends AkairoModule {

  public interval?: number;
  public timestamp?: number;
  public at?: string;
  public last: number;

  public constructor(id: string, options: TaskOptions = {}) {
    super(id, options);
    this.interval = options.interval;
    this.timestamp = options.interval ? 0 : options.timestamp;
    this.last = 0;
    this.at = options.at;

    if (this.at) {
      const timing = this.at.split(':');
      let date = new Date();
      date = new Date(date.setDate(date.getDate()));
      date = new Date(date.setHours(parseInt(timing[0], 10)));
      date = new Date(date.setMinutes(parseInt(timing[1], 10)));
      this.last = date.setSeconds(0);
      this.interval = 1000 * 60 * 60 * 24;
    }
  }

  /**
   * Runs the task.
   */
  public exec() {
    throw Error('Not implemented');
  }

}
