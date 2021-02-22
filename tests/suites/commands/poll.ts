import { Client, Command } from '../../../src/structures';
import { createGuildMessage } from '../../utils/message';
import { PollDocument } from 'types';

export const poll = (client: Client) => describe('Poll', () => {
  const message = createGuildMessage(client);
  const spies: { [key: string]: jest.SpyInstance } = {};
  const provider = client.providers.polls;
  let command: Command; // eslint-disable-line @typescript-eslint/init-declarations
  let args: any = {};   // eslint-disable-line @typescript-eslint/init-declarations

  // eslint-disable-next-line @typescript-eslint/require-await
  provider.create = jest.fn(async (id: string, doc: PollDocument) => {
    doc.id = id;
    provider.cache.set(id, doc);
    return doc;
  });

  const setup = async (content: string) => {
    message.content = content;
    const split = content.split(' ');
    const name = split.shift()?.slice(1);
    const rest = split.join(' ');

    command = <Command> client.commands.modules.get(name!);
    if (command && rest.length) args = await command.parse(message, rest);

    spies.embed = jest.spyOn(command, 'embed');
    spies.error = jest.spyOn(command, 'error');
    spies.t = jest.spyOn(message, 't');
    spies.create = jest.spyOn(provider, 'create');
  };

  it('should error if no content was provided', async () => {
    await setup('!poll');
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(1);
    expect(spies.t).toBeCalledWith('COMMAND_POLL_RESPONSE_NO_TITLE');
  });

  it('should error if timing is below 1 minute', async () => {
    await setup('!poll --close 5s');
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(1);
    expect(spies.t).toBeCalledWith('COMMAND_POLL_RESPONSE_TIME_TOO_LOW');
  });

  it('should error if only one proposition was provided', async () => {
    await setup('!poll question\nproposition 1');
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(1);
    expect(spies.t).toBeCalledWith('COMMAND_POLL_RESPONSE_NOT_ENOUGH_PROPOSITIONS');
  });

  it('should error if one proposition is longer than 96 characters', async () => {
    await setup('!poll question\nproposition 1\nabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd');
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(1);
    expect(spies.t).toBeCalledWith('COMMAND_POLL_RESPONSE_PROPOSITION_TOO_LONG');
  });

  it('should save the poll to the database', async () => {
    await setup('!poll question\nproposition 1\nproposition 2\nproposition 3');
    const sent = await command.exec(message, args);
    expect(spies.embed).toBeCalledTimes(1);
    expect(spies.create).toBeCalledTimes(1);
    expect(sent.react).toBeCalledTimes(4);
    expect(sent.embeds).toHaveLength(1);
    expect(sent.embeds[0].description).toContain('proposition 1');
    expect(sent.embeds[0].description).toContain('proposition 2');
    expect(sent.embeds[0].description).toContain('proposition 3');
  });

  it('should generate yes/no propositions if none provided', async () => {
    await setup('!poll question multi:false');
    const sent = await command.exec(message, args);
    expect(spies.embed).toBeCalledTimes(1);
    expect(spies.create).toBeCalledTimes(1);
    expect(sent.react).toBeCalledTimes(3);
    expect(sent.embeds).toHaveLength(1);
    expect(sent.embeds[0].description).toContain('YES');
    expect(sent.embeds[0].description).toContain('NO');
  });

});
