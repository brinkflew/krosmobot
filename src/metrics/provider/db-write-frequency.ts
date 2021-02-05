import { Metric } from '@/structures';

export default class extends Metric {

  public constructor() {
    super('provider.db.write.frequency', {
      type: 'frequency',
      unit: '/s'
    });
  }

}
