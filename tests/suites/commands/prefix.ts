import { Client, Command } from '../../../src/structures';
import { DEFAULTS } from '../../../src/constants';
import { createGuildMessage } from '../../utils/message';
import { GuildDocument } from 'types';

export const prefix = (client: Client) => describe('Prefix', () => {
  const message = createGuildMessage(client);
  const spies: { [key: string]: jest.SpyInstance } = {};
  let command: Command; // eslint-disable-line @typescript-eslint/init-declarations
  let args: any = {};   // eslint-disable-line @typescript-eslint/init-declarations
  let provider = client.providers.guilds;

  const setup = async (content: string) => {
    message.content = content;
    const split = content.split(' ');
    const name = split.shift()?.slice(1);
    const rest = split.join(' ');

    command = <Command> client.commands.modules.get(name!);
    if (command && rest.length) args = await command.parse(message, rest);

    provider = client.providers.guilds;

    // eslint-disable-next-line @typescript-eslint/require-await
    provider.update = jest.fn(async (id: string, doc: GuildDocument) => {
      provider.cache.set(id, doc);
      return doc;
    });

    spies.success = jest.spyOn(command, 'success');
    spies.warning = jest.spyOn(command, 'warning');
    spies.update = jest.spyOn(provider, 'update');
  };

  it('should reset the default prefix', async () => {
    await setup('!prefix');
    await command.exec(message, args);
    expect(spies.success).toBeCalledTimes(1);
    expect(spies.update).toBeCalledTimes(1);
    expect(spies.update).toBeCalledWith(
      command.getID(message),
      expect.objectContaining({ settings: { prefix: DEFAULTS.PREFIX } })
    );
  });

  it('should warn if previous and new prefixes are identical', async () => {
    await setup(`!prefix ${DEFAULTS.PREFIX}`);
    const provider = command.getProvider(message);
    provider.cache.set(command.getID(message), new provider.model({ settings: { prefix: DEFAULTS.PREFIX } }) as GuildDocument);
    await command.exec(message, args);
    expect(spies.warning).toBeCalledTimes(1);
    expect(spies.update).toBeCalledTimes(0);
    provider.cache.clear();
  });

  it('should save the new prefix', async () => {
    await setup('!prefix $');
    await command.exec(message, args);
    expect(spies.success).toBeCalledTimes(1);
    expect(spies.update).toBeCalledTimes(1);
    expect(spies.update).toBeCalledWith(
      command.getID(message),
      expect.objectContaining({ settings: { prefix: '$' } })
    );
  });

});
