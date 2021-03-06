import { MessageEmbed, SnowflakeUtil } from 'discord.js';
import { MockMessage, MockTextChannel, MockGuild, MockDMChannel, MockUser, MockGuildMember } from 'jest-discordjs-mocks';
import { Client } from '../../src/structures';

export const createDirectMessage = (client: Client, data: any = {}) => {
  const user = new MockUser(client, { id: SnowflakeUtil.generate() });
  const channel = new MockDMChannel(client, { id: SnowflakeUtil.generate() });
  const message = new MockMessage(client, {
    ...data,
    author: user,
    id: SnowflakeUtil.generate()
  }, channel);
  return message;
};

export const createGuildMessage = (client: Client, data: any = {}) => {
  const user = new MockUser(client, { id: SnowflakeUtil.generate(), username: 'OtherUser' });
  const guild = new MockGuild(client, { id: SnowflakeUtil.generate() });
  const member = new MockGuildMember(client, { id: user.id, displayName: 'Test User', user }, guild);
  const channel = new MockTextChannel(guild, { id: SnowflakeUtil.generate() });
  const message = new MockMessage(client, {
    ...data,
    author: user,
    id: SnowflakeUtil.generate(),
    member
  }, channel);

  Object.assign(message, { t: jest.fn((text: string) => text) });

  client.user!.username = 'ClientUser';
  const clientMember = new MockGuildMember(client, { id: client.user!.id, displayName: 'Client User', user: client.user }, guild);
  guild.members.cache.set(clientMember.id, clientMember);

  Object.assign(message.guild!.members, {
    fetch: jest.fn((options: string) => message.guild!.members.cache.get(options))
  });

  Object.assign(message.channel, {
    send: jest.fn((content: string | MessageEmbed, options: any = {}) => {
      const data: { [key: string]: any } = {
        id: SnowflakeUtil.generate(),
        author: client.user,
        guild: message.guild,
        channel: message.channel,
        member
      };

      if (typeof content === 'string') data.content = content;
      if (content instanceof MessageEmbed) data.embeds = [content];
      if (options.files) data.attachments = (options.files as string[]).map(file => ({ id: file, url: file }));

      const newMessage = createGuildMessage(client, data);
      newMessage.react = jest.fn();
      return newMessage;
    })
  });

  Object.assign(message.author, {
    send: jest.fn((content: string | MessageEmbed, options: any = {}) => {
      const data: { [key: string]: any } = {
        id: SnowflakeUtil.generate(),
        author: client.user,
        channel: message.author.dmChannel
      };

      if (typeof content === 'string') data.content = content;
      if (content instanceof MessageEmbed) data.embeds = [content];
      if (options.files) data.attachments = (options.files as string[]).map(file => ({ id: file, url: file }));

      return createDirectMessage(client, data);
    })
  });

  return message;
};
