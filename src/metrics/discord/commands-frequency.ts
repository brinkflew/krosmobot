import { Metric } from '@/structures';
import { TIME } from '@/constants';

export default class extends Metric {

  public constructor() {
    super('discord.commands.frequency', {
      type: 'frequency',
      unit: '/m',
      interval: TIME.MS_PER_MINUTE
    });
  }

}
