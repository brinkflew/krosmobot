import { meter } from '@pm2/io';

export const requests = meter({
  name: 'Database Access',
  id: 'mongodb.requests.frequency',
  unit: '/s'
});

export const cache = meter({
  name: 'Cache Access',
  id: 'mongodb.cache.frequency',
  unit: '/s'
});
