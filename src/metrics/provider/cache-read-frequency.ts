import { Metric } from '@/structures';

export default class extends Metric {

  public constructor() {
    super('provider.cache.read.frequency', {
      type: 'frequency',
      unit: '/s'
    });
  }

}
