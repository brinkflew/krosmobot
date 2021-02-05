import { Metric } from '@/structures';

export default class extends Metric {

  public constructor() {
    super('discord.guilds', {
      type: 'value'
    });
  }

  /**
   * Sets a default value on start.
   */
  public init(): void {
    this.update(this.client.guilds.cache.size);
  }

}
