import { Client, Command } from '../../../src/structures';
import { createGuildMessage } from '../../utils/message';

export const help = (client: Client) => describe('Help', () => {
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
    spies.success = jest.spyOn(command, 'success');
    spies.dm = jest.spyOn(message.author, 'send');
  };

  it('should reply in DM if no command provided', async () => {
    await setup('!help');
    const sent = await command.exec(message, args);
    expect(spies.dm).toBeCalledTimes(1);
    expect(sent.embeds).toHaveLength(1);
    expect(sent.embeds[0].title).toEqual('Available Commands');
  });

  it('should reply in DM if no command provided and sent in a guild', async () => {
    await setup('!help');
    const sent = await command.exec(message, args);
    expect(spies.success).toBeCalledTimes(1);
    expect(spies.dm).toBeCalledTimes(1);
    expect(sent.embeds).toHaveLength(1);
    expect(sent.embeds[0].title).toEqual('Available Commands');
  });

  it('should reply with specific command if provided', async () => {
    await setup('!help ping');
    const sent = await command.exec(message, args);
    expect(spies.embed).toBeCalledTimes(1);
    expect(sent.embeds).toHaveLength(1);
    expect(sent.embeds[0].title).toEqual('PING');
  });

});
