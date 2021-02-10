import dotenv from 'dotenv';
import { Message } from 'discord.js';
import { client, destroy } from './utils/client';
import * as suites from './suites/arguments';
import { GuildDocument } from 'types';

dotenv.config({ path: '.env.test' });

/**
 * Run all tests, which each 'describe' block inside to top level one
 * being run sequentially, while tests blocks inside each 'describe'
 * are run in parrallel.
 */
describe('Arguments', () => {

  beforeAll(() => {
    client.providers.guilds.fetch = jest.fn((id: string) => client.providers.guilds.cache.get(id));

    client.commands.resolver.types.set('dofusServer', (message: Message, phrase: string) => {
      if (/jahash/i.exec(phrase)) return { name: 'Jahash', id: '84' };
      if (!message.guild) return null;
      const server = client.providers.guilds.fetch(message.guild.id)?.dofus?.server;
      if (server) return server;
      return null;
    });

    // eslint-disable-next-line @typescript-eslint/require-await
    client.providers.guilds.create = jest.fn(async (id: string, doc: GuildDocument) => {
      client.providers.guilds.cache.set(id, doc);
      return doc;
    });

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

  Object.values(suites).forEach(suite => suite(client));
});
