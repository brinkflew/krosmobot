import { MongooseProviderDocument } from 'types';
import { Client, Command } from '../../../src/structures';
import { createGuildMessage } from '../../utils/message';

export const almanax = (client: Client) => describe('Almanax', () => {
  const message = createGuildMessage(client);
  const spies: { [key: string]: jest.SpyInstance } = {};
  const provider = client.providers.almanax;
  let command: Command; // eslint-disable-line @typescript-eslint/init-declarations
  let args: any = {};   // eslint-disable-line @typescript-eslint/init-declarations

  provider.fetch = jest.fn((id: string) => client.providers.guilds.cache.get(id));

  // eslint-disable-next-line @typescript-eslint/require-await
  provider.create = jest.fn(async (id: string, doc: Record<string, unknown>) => {
    doc = {
      ...doc,
      images: {
        meryde: doc['images.meryde'],
        item: doc['images.item']
      },
      bonus: {
        title: doc['bonus.title'],
        description: doc['bonus.description']
      }
    };

    provider.cache.set(id, doc as MongooseProviderDocument);
    return doc as MongooseProviderDocument;
  });

  const setup = async (content: string) => {
    message.content = content;
    const split = content.split(' ');
    const name = split.shift()?.slice(1);
    const rest = split.join(' ');

    command = <Command> client.commands.modules.get(name!);
    if (command && rest.length) args = await command.parse(message, rest);
    else args = {};

    spies.embed = jest.spyOn(command, 'embed');
    spies.error = jest.spyOn(command, 'error');
  };

  it('should error if a date is provided and is invalid', async () => {
    await setup('!almanax abc');
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(1);
  });

  it('should reply with the almanax of the day', async () => {
    await setup('!almanax');
    const sent = await command.exec(message, args);
    expect(spies.embed).toBeCalledTimes(1);
    expect(sent.embeds).toHaveLength(1);
  });

  it('should reply with the almanax two days later', async () => {
    await setup('!almanax +2');
    const sent = await command.exec(message, args);
    expect(spies.embed).toBeCalledTimes(1);
    expect(sent.embeds).toHaveLength(1);
  });

  it('should reply with the almanax for December 10', async () => {
    provider.cache.clear();
    await setup('!almanax 10/12');
    const sent = await command.exec(message, args);
    expect(spies.embed).toBeCalledTimes(1);
    expect(sent.embeds).toHaveLength(1);
  });

  it('should reply with the extended version of the almanax', async () => {
    await setup('!almanax --detail');
    const sent = await command.exec(message, args);
    expect(spies.embed).toBeCalledTimes(1);
    expect(sent.embeds).toHaveLength(1);
  });

});
