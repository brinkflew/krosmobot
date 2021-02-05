import { Command } from 'discord-akairo';
import { SnowflakeUtil } from 'discord.js';
import { MockGuild, MockTextChannel } from 'jest-discordjs-mocks';
import { Client, Task } from '../../../src/structures';

export const almanax = (client: Client) => describe('Almanax', () => {
  const spies: { [key: string]: jest.SpyInstance } = {};
  const provider = client.providers.guilds;

  /* eslint-disable @typescript-eslint/init-declarations */
  let task: Task;
  let command: Command;
  /* eslint-enable @typescript-eslint/init-declarations */

  beforeAll(() => {
    task = client.scheduler.modules.get('almanax')!;
    command = client.commands.modules.get('almanax')!;
    command.exec = jest.fn();
    spies.exec = jest.spyOn(command, 'exec');
  });

  it('should not trigger if no guilds in cache', async () => {
    await task.exec();
    expect(spies.exec).toBeCalledTimes(0);
  });

  it('should trigger once for each configured guild', async () => {
    const guild1 = new MockGuild(client, { id: SnowflakeUtil.generate() });
    const guild2 = new MockGuild(client, { id: SnowflakeUtil.generate() });
    client.guilds.cache.set(guild1.id, guild1);
    client.guilds.cache.set(guild2.id, guild2);

    const channel = new MockTextChannel(guild1, { id: SnowflakeUtil.generate() });
    Object.assign(channel, { type: 'text' });
    guild1.channels.cache.set(channel.id, channel);

    await provider.create(guild1.id, { channels: { almanax: channel.id } });

    await task.exec();
    expect(spies.exec).toBeCalledTimes(1);
  });

});
