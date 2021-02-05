import { Collection } from 'discord.js';
import { MongooseProviderDocument } from 'types';
import { Client, Command } from '../../../src/structures';
import { createGuildMessage } from '../../utils/message';

export const job = (client: Client) => describe('Job', () => {
  const message = createGuildMessage(client);
  const spies: { [key: string]: jest.SpyInstance } = {};
  let command: Command; // eslint-disable-line @typescript-eslint/init-declarations
  let args: any = {};   // eslint-disable-line @typescript-eslint/init-declarations

  const provider = client.providers.members;

  const setup = async (content: string) => {
    message.content = content;
    message.author.avatarURL = jest.fn();
    const split = content.split(' ');
    const name = split.shift()?.slice(1);
    const rest = split.join(' ');

    command = <Command> client.commands.modules.get(name!);
    if (command && rest.length) args = await command.parse(message, rest);

    spies.embed = jest.spyOn(command, 'embed');
    spies.warning = jest.spyOn(command, 'warning');

    // eslint-disable-next-line @typescript-eslint/require-await
    provider.update = jest.fn(async (id: string, record: Record<string, unknown>) => {
      provider.cache.set(id, record as MongooseProviderDocument);
      return record as MongooseProviderDocument;
    });

    // eslint-disable-next-line @typescript-eslint/require-await
    provider.create = jest.fn(async (id: string, record: Record<string, unknown>) => {
      provider.cache.set(id, record as MongooseProviderDocument);
      return record as MongooseProviderDocument;
    });
  };

  it('should save the level of the author for the job provided', async () => {
    Object.assign(message.guild, { ...message.guild, members: { cache: new Collection() } });
    await setup('!job tailor 100');
    await command.exec(message, args);
    expect(spies.embed).toBeCalledTimes(1);
    expect(provider.cache.size).toBeGreaterThanOrEqual(1);
  });

  it('should warn if no user has the job provided', async () => {
    await setup('!job tailor');
    await command.exec(message, args);
    expect(spies.warning).toBeCalledTimes(1);
    expect(provider.cache.size).toBeGreaterThanOrEqual(1);
  });

  it('should display the level of all users for the job provided', async () => {
    Object.assign(message.guild, { ...message.guild, members: { cache: new Collection() } });
    await setup('!job tailor 100');
    await command.exec(message, args);
    await setup('!job tailor');
    await command.exec(message, args);
    expect(spies.embed).toBeCalledTimes(1);
    expect(provider.cache.size).toBeGreaterThanOrEqual(1);
  });

  it('should warn if the user provided has no job', async () => {
    await setup('!job TestAuthor');
    await command.exec(message, args);
    expect(spies.warning).toBeCalledTimes(1);
    expect(provider.cache.size).toBeGreaterThanOrEqual(1);
  });

  it('should display the levels of all jobs for the user provided', async () => {
    Object.assign(message.guild, { ...message.guild, members: { cache: new Collection() } });
    await setup('!job tailor 100');
    await command.exec(message, args);
    await setup('!job TestAuthor');
    await command.exec(message, args);
    expect(spies.embed).toBeCalledTimes(2);
    expect(provider.cache.size).toBeGreaterThanOrEqual(1);
  });

  it('should warn if the level is higher than 200', async () => {
    await setup('!job tailor 300');
    await command.exec(message, args);
    expect(spies.warning).toBeCalledTimes(1);
    expect(spies.embed).toBeCalledTimes(1);
    expect(provider.cache.size).toBeGreaterThanOrEqual(1);
  });

});
