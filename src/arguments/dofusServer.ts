import { Message } from 'discord.js';
import { findPortalServer } from '@/utils';
import { Client } from '@/structures';

export const dofusServer = async (message: Message, phrase: string) => {
  if (!phrase && !message.guild) return null;

  if (phrase) {
    const server = await findPortalServer(phrase);
    if (!server) return null;
    return { id: <string> server.id, name: <string> server.name };
  }

  if (!message.guild) return null;
  const doc = (<Client> message.client).providers.guilds.fetch(message.guild.id);
  if (doc?.dofus?.server?.id) return doc.dofus.server;
};
