import { Client, Command } from '../../../src/structures';
import { createGuildMessage } from '../../utils/message';

export const zaap = (client: Client) => describe('Zaap', () => {
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

  it('should error if no coordinates are provided', async () => {
    await setup('!zaap');
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(1);
    expect(spies.embed).toBeCalledTimes(0);
  });

  it('should reply with he closest transports', async () => {
    await setup('!zaap -25,-18');
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(0);
    expect(spies.embed).toBeCalledTimes(1);
  });

});
