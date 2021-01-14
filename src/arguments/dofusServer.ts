import { Message } from 'discord.js';
import { findPortalServer } from '@/utils';

export const dofusServer = async (_message: Message, phrase: string) => {
  if (!phrase) return null;
  const server = await findPortalServer(phrase);
  if (!server) return null;
  return { id: <string> server.id, name: <string> server.name };
};
