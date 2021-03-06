import { Metric } from '@/structures';

export default class extends Metric {

  public constructor() {
    super('discord.channels', {
      type: 'value'
    });
  }

  /**
   * Sets a default value on start.
   */
  public init(): void {
    this.update(this.client.channels.cache.size);
  }

}
