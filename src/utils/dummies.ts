import { TextChannel, DMChannel, Message } from 'discord.js';
import { AkairoClient } from 'discord-akairo';

/**
 * Crafts a dummy message to use when executing commands from tasks.
 * @param client Client
 * @param channel Channel
 */
export const dummyMessage = (client: AkairoClient, channel: TextChannel | DMChannel) => {
  const data = {
    id: 'dummy',
    content: 'dummy',
    author: client.user
  };

  return new Message(client, data, channel);
};
