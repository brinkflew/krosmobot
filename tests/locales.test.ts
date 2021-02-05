import dotenv from 'dotenv';
import { client, destroy } from './utils/client';

dotenv.config({ path: '.env.test' });

/**
 * Run all tests, which each 'describe' block inside to top level one
 * being run sequentially, while tests blocks inside each 'describe'
 * are run in parrallel.
 */
describe('Locales', () => {

  beforeAll(() => {
    client.events.setEmitters({
      process,
      commands: client.commands,
      scheduler: client.scheduler
    });

    client.commands.loadAll().useListenerHandler(client.events);
    client.events.loadAll();
    client.locales.loadAll();
    client.metrics.loadAll().init();
    client.scheduler.loadAll().init();
  });

  afterAll(() => destroy());

  // Run before each test
  beforeEach(() => jest.clearAllMocks());

  test('all locales should have the same number of strings', () => {
    const counts = client.locales.modules.array().map(locale => Object.keys(locale.strings).length);
    const first = counts.shift();
    counts.forEach(count => expect(count).toEqual(first));
  });

  test('all keys resolve to a string', () => {
    const locales = client.locales.modules.array();

    for (const locale of locales) {
      Object.keys(locale.strings).forEach(key => {
        try {
          const translated = locale.translate(key);
          expect(typeof translated).toEqual('string');
        } catch (error) {
          expect(error.name).toEqual('TypeError');
        }
      });
    }
  });
});
