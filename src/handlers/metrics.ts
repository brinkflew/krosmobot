import {
  AkairoClient,
  AkairoHandler,
  AkairoHandlerOptions
} from 'discord-akairo';
import { Collection } from 'discord.js';
import { Metric } from '@/structures';

/**
 * Handles metrics collection.
 * @param client Client to attach to
 * @param options Options for the handler
 */
export class MetricHandler extends AkairoHandler {

  public modules!: Collection<string, Metric>;

  public constructor(client: AkairoClient, options: AkairoHandlerOptions = {}) {
    super(client, {
      directory: options.directory,
      classToHandle: Metric
    });
  }

  /**
   * Initializes all loaded metrics.
   */
  public init(): void {
    this.modules.forEach(metric => metric.init());
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
  public get(id: string): Metric {
    const metric = this.modules.get(id);
    if (!metric) throw new Error(`Invalid metric: '${id}'`);
    return metric;
  }

  /**
   * Updates the value of a metric.
   * @param id ID of the metric to update
   * @param value Value to set
   */
  public update(id: string, value = 1) {
    return this.get(id).update(value);
  }

  /**
   * Increments the value of a metric.
   * @param id ID of the metric to increment
   */
  public inc(id: string) {
    return this.get(id).increment();
  }

  /**
   * Decrements the value of a metric.
   * @param id ID of the metric to decrement
   */
  public dec(id: string) {
    return this.get(id).decrement();
  }

}
