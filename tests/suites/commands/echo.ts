import { SnowflakeUtil, MessageEmbed, GuildMember } from 'discord.js';
import { MockTextChannel } from 'jest-discordjs-mocks';
import { Client, Command } from '../../../src/structures';
import { createGuildMessage } from '../../utils/message';

export const echo = (client: Client) => describe('Echo', () => {
  const message = createGuildMessage(client);
  const spies: { [key: string]: jest.SpyInstance } = {};
  const permissions: Record<string, Set<string>> = {};
  let command: Command; // eslint-disable-line @typescript-eslint/init-declarations
  let args: any = {};   // eslint-disable-line @typescript-eslint/init-declarations

  const channel = new MockTextChannel(message.guild, { id: SnowflakeUtil.generate(), name: 'test-channel' });

  Object.assign(channel, {
    type: 'text',
    permissionsFor: jest.fn((member: GuildMember) => permissions[member.id]),
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

  Object.assign(message.channel, {
    permissionsFor: jest.fn((member: GuildMember) => permissions[member.id])
  });

  message.guild?.channels.cache.set(channel.id, channel);

  permissions[client.user!.id] = new Set();
  permissions[message.member!.id] = new Set();

  const setup = async (content: string) => {
    message.content = content;
    const split = content.split(' ');
    const name = split.shift()?.slice(1);
    const rest = split.join(' ');

    command = <Command> client.commands.modules.get(name!);
    if (command && rest.length) args = await command.parse(message, rest);

    spies.success = jest.spyOn(command, 'success');
    spies.error = jest.spyOn(command, 'error');
    spies.sendSameChannel = jest.spyOn(message.channel, 'send');
    spies.sendOtherChannel = jest.spyOn(channel, 'send');
  };

  it('should error if no content provided', async () => {
    await setup('!echo');
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(1);
  });

  it('should error if the client has no rights to send messages', async () => {
    await setup(`!echo <#${channel.id}> content`);
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(1);
    permissions[client.user!.id].add('SEND_MESSAGES');
  });

  it('should error if the author has no rights to send messages', async () => {
    await setup(`!echo <#${channel.id}> content`);
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(1);
    permissions[message.member!.id].add('SEND_MESSAGES');
  });

  it('should reply with content in same channel if only one word provided', async () => {
    await setup('!echo value');
    const sent = await command.exec(message, args);
    expect(spies.success).toBeCalledTimes(0);
    expect(spies.sendSameChannel).toBeCalledTimes(1);
    expect(sent.content).toEqual('value');
  });

  it('should reply with content in same channel if multiple words provided', async () => {
    await setup('!echo value no channel');
    const sent = await command.exec(message, args);
    expect(spies.success).toBeCalledTimes(0);
    expect(spies.sendSameChannel).toBeCalledTimes(1);
    expect(sent.content).toEqual('value no channel');
  });

  it('should reply with content in another channel', async () => {
    await setup(`!echo <#${channel.id}> value`);
    const sent = await command.exec(message, args);
    expect(spies.success).toBeCalledTimes(1);
    expect(spies.sendOtherChannel).toBeCalledTimes(1);
    expect(sent.content).toEqual('value');
  });

  it('should reply with content and a file attached', async () => {
    await setup(`!echo value --file https://testfile.png`);
    const sent = await command.exec(message, args);
    expect(spies.sendSameChannel).toBeCalledTimes(1);
    expect(sent.content).toEqual('value');
    expect(sent.attachments.size).toEqual(1);
  });

});
