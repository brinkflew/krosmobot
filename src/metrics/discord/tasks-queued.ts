import { Metric } from '@/structures';

export default class extends Metric {

  public constructor() {
    super('discord.tasks.queued', {
      type: 'value'
    });
  }

}
