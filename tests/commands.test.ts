import dotenv from 'dotenv';
import { client } from './utils/client';
import * as suites from './suites/commands';
import { SnowflakeUtil, ClientApplication } from 'discord.js';
import { MoockClientUser } from 'jest-discordjs-mocks';

dotenv.config({ path: '.env.test' });

/**
 * Run all tests, which each 'describe' block inside to top level one
 * being run sequentially, while tests blocks inside each 'describe'
 * are run in parrallel.
 */
describe('Commands', () => {
  client.user = new MoockClientUser(client, { id: SnowflakeUtil.generate() });
  client.application = new ClientApplication(client, { id: SnowflakeUtil.generate() });

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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    client.crons.forEach(cron => clearInterval(cron));
    client.destroy();
  });

  Object.values(suites).forEach(suite => suite(client));
});
