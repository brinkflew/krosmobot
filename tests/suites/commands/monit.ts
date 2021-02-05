import { Client, Command } from '../../../src/structures';
import { createGuildMessage } from '../../utils/message';

export const monit = (client: Client) => describe('Monit', () => {
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

    spies.send = jest.spyOn(message.channel, 'send');
  };

  it('should reply with stats', async () => {
    await setup('!monit');
    await command.exec(message, args);
    expect(spies.send).toBeCalledTimes(1);
  });

});
