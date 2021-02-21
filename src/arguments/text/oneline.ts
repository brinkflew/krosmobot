import { Message } from 'discord.js';

export const oneline = (_message: Message, phrase: string) => {
  if (!phrase) return null;
  const split = phrase.split('\n').filter(l => l.trim().length > 0);
  if (!split.length) return null;
  return split[0];
};
