import { Client, Command } from '../../../src/structures';
import { EMBEDS } from '../../../src/constants';
import { createGuildMessage } from '../../utils/message';
import { GuildDocument } from 'types';

export const color = (client: Client) => describe('Color', () => {
  const spies: { [key: string]: jest.SpyInstance } = {};
  const message = createGuildMessage(client);
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

    spies.embed = jest.spyOn(command, 'embed');
    spies.warning = jest.spyOn(command, 'warning');
    spies.update = jest.spyOn(provider, 'update');
  };

  it('should reset the default color', async () => {
    await setup('!color');
    await command.exec(message, args);
    expect(spies.embed).toBeCalledTimes(1);
    expect(spies.update).toBeCalledTimes(1);
    expect(spies.update).toBeCalledWith(
      command.getID(message),
      expect.objectContaining({ settings: { color: EMBEDS.COLORS.DEFAULT } })
    );
  });

  it('should warn if previous and new colors are identical', async () => {
    await provider.update(message.guild!.id, { settings: { color: EMBEDS.COLORS.DEFAULT } });
    await setup(`!color ${EMBEDS.COLORS.DEFAULT}`);
    await command.exec(message, args);
    expect(spies.warning).toBeCalledTimes(1);
    expect(spies.update).toBeCalledTimes(0);
    provider.cache.clear();
  });

  it('should save the new color', async () => {
    await setup('!color #c0ffee');
    await command.exec(message, args);
    expect(spies.embed).toBeCalledTimes(1);
    expect(spies.update).toBeCalledTimes(1);
    expect(spies.update).toBeCalledWith(
      command.getID(message),
      expect.objectContaining({ settings: { color: '#C0FFEE' } })
    );
  });

});
