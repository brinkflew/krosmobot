import { AkairoModule } from 'discord-akairo';
import { Collection } from 'discord.js';
import { MetricOptions } from 'types';
import { TIME } from '@/constants';

/**
 * An interface to collect data about the running processes.
 */
export class Metric extends AkairoModule {

  public collector: Collection<number, number>;
  public type: 'value' | 'frequency' | 'average';
  public unit?: string;
  public interval: number;
  public default: number;

  public constructor(id: string, options: MetricOptions) {
    super(id, options);
    this.collector = new Collection();
    this.type = options.type;
    this.unit = options.unit;
    this.interval = options.interval || TIME.MS_PER_SECOND;
    this.default = options.default || 0;
  }

  /**
   * Initializes the metric.
   */
  public init(): void {
    this.update(this.default);
  }

  /**
   * Updates a metric with the given value
   * @param value Value to set
   */
  public update(value = 1): void {
    this.collector.set(Date.now(), value);
  }

  /**
   * Gets the current value for this metric.
   */
  public get value() {
    if (this.type === 'average') {
      const count = this.collector.size;
      if (!count) return 0;
      return this.collector.array().reduce((a, b) => a + b, 0) / count;
    }

    if (this.type === 'frequency') {
      const timestamp = Date.now() - this.interval;
      return this.collector.filter((_, key) => key >= timestamp).size;
    }

    /* if (this.type === 'value') */ return this.last;
  }

  /**
   * Increments the current value.
   */
  public increment(): void {
    if (this.type !== 'value') throw new TypeError(`Cannot increment value on ${this.type} metric`);
    return this.update((this.last || this.default) + 1);
  }

  /**
   * Decrements the current value.
   */
  public decrement(): void {
    if (this.type !== 'value') throw new TypeError(`Cannot decrement value on ${this.type} metric`);
    return this.update((this.last || this.default) - 1);
  }

  /**
   * Get the last registered value
   */
  public get last(): number | undefined {
    return this.collector.last();
  }

}
