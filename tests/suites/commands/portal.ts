import { Client, Command } from '../../../src/structures';
import { createGuildMessage } from '../../utils/message';

export const portal = (client: Client) => describe('Portal', () => {
  const message = createGuildMessage(client);
  const spies: { [key: string]: jest.SpyInstance } = {};
  let command: Command; // eslint-disable-line @typescript-eslint/init-declarations
  let args: any = {};   // eslint-disable-line @typescript-eslint/init-declarations

  const setup = async (content: string) => {
    message.content = content;
    const split = content.split(' ');
    const name = split.shift()?.slice(1);
    const rest = split.join(' ');

    command = <Command> client.commands.modules.get(name!);
    if (command && rest.length) args = await command.parse(message, rest);

    spies.embed = jest.spyOn(command, 'embed');
    spies.error = jest.spyOn(command, 'error');
  };

  it('should error if no server is set', async () => {
    await setup('!portal');
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(1);
    expect(spies.embed).toBeCalledTimes(0);
  });

  it('should error if no data could be found', async () => {
    await setup('!portal');
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(1);
    expect(spies.embed).toBeCalledTimes(0);
  });

  it('should send the position for any dimension one by one', async () => {
    for (const dimension of ['eca', 'enu', 'sram', 'xel']) {
      await setup(`!portal ${dimension} jahash`);
      await command.exec(message, args);
    }

    expect(spies.error).toBeCalledTimes(0);
    expect(spies.embed).toBeCalledTimes(4);
  });

  it('should send the position for all dimensions at once', async () => {
    await setup(`!portal jahash`);
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(0);
    expect(spies.embed).toBeCalledTimes(4);
  });

});
