import { Metric } from '@/structures';

export default class extends Metric {

  public constructor() {
    super('discord.shards', {
      type: 'value'
    });
  }

}
