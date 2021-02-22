import { Client, Command } from '../../../src/structures';
import { createGuildMessage } from '../../utils/message';

export const about = (client: Client) => describe('About', () => {
  const message = createGuildMessage(client);
  let command: Command; // eslint-disable-line @typescript-eslint/init-declarations
  let args: any = {};   // eslint-disable-line @typescript-eslint/init-declarations

  const setup = async (content: string) => {
    message.content = content;
    const split = content.split(' ');
    const name = split.shift()?.slice(1);
    const rest = split.join(' ');

    command = <Command> client.commands.modules.get(name!);
    if (command && rest.length) args = await command.parse(message, rest);
  };

  it('should reply with information', async () => {
    await setup('!about');
    await command.exec(message, args);
    expect(message.channel.send).toBeCalledTimes(1);
  });

});
