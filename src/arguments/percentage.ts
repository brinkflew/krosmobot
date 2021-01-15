import { Message } from 'discord.js';

export const percentage = (_message: Message, phrase: string) => {
  if (!phrase) return null;
  let parsed = parseFloat(phrase.replace('%', ''));
  if (isNaN(parsed)) return null;
  if (phrase.endsWith('%')) parsed /= 100;
  return Math.min(1, Math.max(0, parsed));
};
