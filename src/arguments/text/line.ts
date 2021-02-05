import { Message } from 'discord.js';

export const line = (_message: Message, phrase: string) => {
  if (!phrase) return null;
  return phrase.split('\n').filter(l => l.trim().length > 0);
};
