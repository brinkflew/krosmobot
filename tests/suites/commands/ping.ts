import { Client, Command } from '../../../src/structures';
import { createGuildMessage } from '../../utils/message';

export const ping = (client: Client) => describe('Ping', () => {
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
  };

  it('should reply with Pong!', async () => {
    await setup('!ping');
    const sent = await command.exec(message, args);
    expect(spies.embed).toBeCalledTimes(2);
    expect(sent.embeds).toHaveLength(1);
    expect(sent.embeds[0].title).toEqual('COMMAND_PING_RESPONSE_TITLE');
  });

});
