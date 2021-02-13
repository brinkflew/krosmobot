import { Collection, SnowflakeUtil, MessageEmbed } from 'discord.js';
import { MockTextChannel } from 'jest-discordjs-mocks';
import { Client, Command } from '../../../src/structures';
import { createGuildMessage } from '../../utils/message';
import { GuildDocument } from 'types';

export const set = (client: Client) => describe('Set', () => {
  const message = createGuildMessage(client);
  const spies: { [key: string]: jest.SpyInstance } = {};
  let command: Command; // eslint-disable-line @typescript-eslint/init-declarations
  let args: any = {};   // eslint-disable-line @typescript-eslint/init-declarations
  let provider = client.providers.guilds;

  const channel = new MockTextChannel(message.guild, { id: SnowflakeUtil.generate(), name: 'test-channel' });
  Object.assign(channel, {
    type: 'text',
    send: jest.fn((content: string | MessageEmbed, options: any = {}) => {
      const data: { [key: string]: any } = {
        id: SnowflakeUtil.generate(),
        author: client.user,
        guild: message.guild,
        channel
      };

      if (typeof content === 'string') data.content = content;
      if (content instanceof MessageEmbed) data.embeds = [content];
      if (options.files) data.attachments = (options.files as string[]).map(file => ({ id: file, url: file }));

      return createGuildMessage(client, data);
    })
  });

  message.guild?.channels.cache.set(channel.id, channel);

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
    spies.error = jest.spyOn(command, 'error');
    spies.update = jest.spyOn(provider, 'update');
  };

  it('should error if no key is provided', async () => {
    await setup('!set');
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(1);
    expect(spies.success).toBeCalledTimes(0);
    expect(spies.update).toBeCalledTimes(0);
  });

  it('should error if the number of keys and values provided is different', async () => {
    await setup('!set test');
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(1);
    expect(spies.success).toBeCalledTimes(0);
    expect(spies.update).toBeCalledTimes(0);
  });

  it('should error if no valid key-value pair is provided', async () => {
    await setup('!set almanax invalid-channel dofus-server invalid-server');
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(1);
    expect(spies.success).toBeCalledTimes(0);
    expect(spies.update).toBeCalledTimes(0);
  });

  it('should warn if an invalid key is provided', async () => {
    await setup('!set test value');
    await command.exec(message, args);
    expect(spies.warning).toBeCalledTimes(1);
    expect(spies.success).toBeCalledTimes(0);
    expect(spies.update).toBeCalledTimes(0);
  });

  it('should warn if a valid key is provided with an incorrect value', async () => {
    Object.assign(message.guild, { ...message.guild, channels: { cache: new Collection() } });
    await setup('!set twitter value');
    await command.exec(message, args);
    expect(spies.warning).toBeCalledTimes(1);
    expect(spies.success).toBeCalledTimes(0);
    expect(spies.update).toBeCalledTimes(0);
  });

  it('should warn if a valid key is provided with an incorrect value but valid pairs are provided', async () => {
    Object.assign(message.guild, { ...message.guild, channels: { cache: new Collection() } });
    await setup('!set twitter value dofus-server jahash');
    await command.exec(message, args);
    expect(spies.warning).toBeCalledTimes(1);
    expect(spies.success).toBeCalledTimes(1);
    expect(spies.update).toBeCalledTimes(1);
  });

  it('should save the value if a valid key-value pair is provided', async () => {
    await setup('!set dofus-server jahash');
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(0);
    expect(spies.success).toBeCalledTimes(1);
    expect(spies.update).toBeCalledTimes(1);
    expect(spies.update).toBeCalledWith(command.getID(message), expect.anything());
  });

  it('should save the value if multiple keys are provided', async () => {
    message.guild?.channels.cache.set(channel.id, channel);
    await setup(`!set dofus-server jahash almanax #${channel.name} twitter <#${channel.id}>`);
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(0);
    expect(spies.success).toBeCalledTimes(1);
    expect(spies.update).toBeCalledTimes(1);
    expect(spies.update).toBeCalledWith(command.getID(message), expect.anything());
  });

});
