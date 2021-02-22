import { Client, Command } from '../../../src/structures';
import { createGuildMessage } from '../../utils/message';
import { ReminderDocument } from 'types';

export const remind = (client: Client) => describe('Remind', () => {
  const message = createGuildMessage(client);
  const spies: { [key: string]: jest.SpyInstance } = {};
  const provider = client.providers.reminders;
  let command: Command; // eslint-disable-line @typescript-eslint/init-declarations
  let args: any = {};   // eslint-disable-line @typescript-eslint/init-declarations

  const setup = async (content: string) => {
    message.content = content;
    const split = content.split(' ');
    const name = split.shift()?.slice(1);
    const rest = split.join(' ');

    // eslint-disable-next-line @typescript-eslint/require-await
    provider.update = jest.fn(async (id: string, doc: ReminderDocument) => {
      provider.cache.set(id, doc);
      return doc;
    });

    command = <Command> client.commands.modules.get(name!);
    if (command && rest.length) args = await command.parse(message, rest);

    spies.success = jest.spyOn(command, 'success');
    spies.warning = jest.spyOn(command, 'warning');
    spies.error = jest.spyOn(command, 'error');
    spies.t = jest.spyOn(message, 't');
    spies.update = jest.spyOn(provider, 'update');
  };

  it('should error if no content provided', async () => {
    await setup('!remind');
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(1);
    expect(spies.t).toBeCalledWith('COMMAND_REMIND_RESPONSE_NO_CONTENT');
    expect(spies.update).toBeCalledTimes(0);
  });

  it('should error if timing is below 1 minute', async () => {
    await setup('!remind --in 5s test content');
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(1);
    expect(spies.t).toBeCalledWith('COMMAND_REMIND_RESPONSE_TIME_TOO_LOW');
    expect(spies.update).toBeCalledTimes(0);
  });

  it('should set a reminder in 1 day', async () => {
    await setup('!remind test content');
    const sent = await command.exec(message, args);
    expect(spies.success).toBeCalledTimes(1);
    expect(spies.update).toBeCalledTimes(1);
    expect(spies.update).toBeCalledWith(
      message.id,
      expect.objectContaining({
        timestamp: expect.any(Number),
        content: 'test content',
        guild: message.guild?.id,
        channel: message.channel.id,
        author: message.author.id,
        locale: 'en'
      })
    );
    expect(sent.embeds).toHaveLength(1);
    expect(sent.embeds[0].description).toContain('COMMAND_REMIND_RESPONSE_SUCCESS');
  });

  it('should set a reminder in 1 minute', async () => {
    await setup('!remind --in 1m test content');
    const sent = await command.exec(message, args);
    expect(spies.success).toBeCalledTimes(1);
    expect(spies.update).toBeCalledTimes(1);
    expect(spies.update).toBeCalledWith(
      message.id,
      expect.objectContaining({
        timestamp: expect.any(Number),
        content: 'test content',
        guild: message.guild?.id,
        channel: message.channel.id,
        author: message.author.id,
        locale: 'en'
      })
    );
    expect(sent.embeds).toHaveLength(1);
    expect(sent.embeds[0].description).toContain('COMMAND_REMIND_RESPONSE_SUCCESS');
  });

});
