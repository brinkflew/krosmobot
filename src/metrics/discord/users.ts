import { Metric } from '@/structures';

export default class extends Metric {

  public constructor() {
    super('discord.users', {
      type: 'value'
    });
  }

  /**
   * Sets a default value on start.
   */
  public init(): void {
    this.update(this.client.userCount);
  }

}
