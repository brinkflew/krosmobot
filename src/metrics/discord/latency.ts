import { Metric } from '@/structures';

export default class extends Metric {

  public constructor() {
    super('discord.latency', {
      type: 'value',
      unit: 'ms'
    });
  }

  /**
   * Sets a default value on start.
   */
  public init(): void {
    this.update(this.client.ws.ping);
  }

}
