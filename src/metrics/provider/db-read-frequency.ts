import { Metric } from '@/structures';

export default class extends Metric {

  public constructor() {
    super('provider.db.read.frequency', {
      type: 'frequency',
      unit: '/s'
    });
  }

}
