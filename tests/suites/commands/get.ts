import { Client, Command } from '../../../src/structures';
import { createGuildMessage } from '../../utils/message';

export const get = (client: Client) => describe('Get', () => {
  const message = createGuildMessage(client);
  const spies: { [key: string]: jest.SpyInstance } = {};
  const provider = client.providers.guilds;
  let command: Command; // eslint-disable-line @typescript-eslint/init-declarations
  let args: any = {};   // eslint-disable-line @typescript-eslint/init-declarations

  provider.fetch = jest.fn((id: string) => client.providers.guilds.cache.get(id));

  const setup = async (content: string) => {
    message.content = content;
    const split = content.split(' ');
    const name = split.shift()?.slice(1);
    const rest = split.join(' ');

    command = <Command> client.commands.modules.get(name!);
    if (command && rest.length) args = await command.parse(message, rest);

    spies.embed = jest.spyOn(command, 'embed');
    spies.warning = jest.spyOn(command, 'warning');
    spies.fetch = jest.spyOn(client.providers.guilds, 'fetch');
  };

  it('should get all keys if none provided', async () => {
    await setup('!get');
    const sent = await command.exec(message, args);
    expect(spies.fetch).toBeCalled();
    expect(spies.embed).toBeCalledTimes(1);
    expect(sent.embeds).toHaveLength(1);
    expect(sent.embeds[0].description).toContain('almanax →');
    expect(sent.embeds[0].description).toContain('twitter →');
    expect(sent.embeds[0].description).toContain('dofus-server →');
    expect(sent.embeds[0].description).toContain('prefix →');
    expect(sent.embeds[0].description).toContain('color →');
    expect(sent.embeds[0].description).toContain('locale →');
  });

  it('should get a single key if one provided', async () => {
    await setup('!get prefix');
    const sent = await command.exec(message, args);
    expect(spies.fetch).toBeCalled();
    expect(spies.embed).toBeCalledTimes(1);
    expect(sent.embeds).toHaveLength(1);
    expect(sent.embeds[0].description).not.toContain('almanax →');
    expect(sent.embeds[0].description).not.toContain('twitter →');
    expect(sent.embeds[0].description).not.toContain('dofus-server →');
    expect(sent.embeds[0].description).toContain('prefix →');
    expect(sent.embeds[0].description).not.toContain('color →');
    expect(sent.embeds[0].description).not.toContain('locale →');
  });

  it('should warn if a single invalid key is provided', async () => {
    await setup('!get test');
    await command.exec(message, args);
    expect(spies.fetch).toBeCalled();
    expect(spies.warning).toBeCalledTimes(2);
    expect(spies.embed).toBeCalledTimes(0);
  });

  it('should warn and respond if an invalid key is provided along with valid keys', async () => {
    await setup('!get test color');
    const sent = await command.exec(message, args);
    expect(spies.fetch).toBeCalled();
    expect(spies.warning).toBeCalledTimes(1);
    expect(spies.embed).toBeCalledTimes(1);
    expect(sent.embeds).toHaveLength(1);
    expect(sent.embeds[0].description).toContain('color →');
  });

});
