import { Client, Command } from '../../../src/structures';
import { createGuildMessage } from '../../utils/message';

export const dice = (client: Client) => describe('Dice', () => {
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
    spies.run = jest.spyOn(client.commands.modules.get('dice')!, 'exec');
  };

  it('should roll one 6-faced dice if no arguments are provided', async () => {
    await setup('!dice');
    const sent = await command.exec(message, args);
    expect(spies.embed).toBeCalledTimes(1);
    expect(sent.embeds).toHaveLength(1);
    expect(sent.embeds[0].thumbnail.url).toBeDefined();
  });

  it('should error if the number of rolls is not an integer', async () => {
    await setup('!dice 1.5d6');
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(1);
    expect(spies.embed).toBeCalledTimes(0);
  });

  it('should error if the number of faces is not an integer', async () => {
    await setup('!dice 2d1.5');
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(1);
    expect(spies.embed).toBeCalledTimes(0);
  });

  it('should error if the number of rolls is equal to 0', async () => {
    await setup('!dice 0d6');
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(1);
    expect(spies.embed).toBeCalledTimes(0);
  });

  it('should error if the number of faces is equal to 0', async () => {
    await setup('!dice 2d0');
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(1);
    expect(spies.embed).toBeCalledTimes(0);
  });

  it('should roll two 10-faced dices', async () => {
    await setup('!dice 2d10');
    const sent = await command.exec(message, args);
    expect(spies.embed).toBeCalledTimes(1);
    expect(sent.embeds).toHaveLength(1);
  });

  it('should error if the number of rolls is too high', async () => {
    await setup('!dice 10000d6');
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(1);
    expect(spies.embed).toBeCalledTimes(0);
  });

  it('should error if the number of faces is too high', async () => {
    await setup('!dice 2d1000000');
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(1);
    expect(spies.embed).toBeCalledTimes(0);
  });

  it('should be handled when the shortcut is used', async () => {
    message.content = '!1d6';
    await client.commands.handle(message);
    expect(spies.run).toBeCalledTimes(1);
  });

  it('should resize large text in canvas', async () => {
    await setup('!dice 999d999');
    await command.exec(message, args);
    expect(spies.embed).toBeCalledTimes(1);
  });

});
