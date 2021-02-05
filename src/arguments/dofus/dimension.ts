import { Message } from 'discord.js';
import { ARGUMENTS } from '@/constants';
import { fuzzy2D } from '@/utils';

export const dofusDimension = (_message: Message, phrase: string) => {
  if (!phrase) return null;
  phrase = phrase.toLowerCase();
  const found = fuzzy2D(phrase, ARGUMENTS.DOFUS_DIMENSIONS, 2);
  if (!found) return null;
  return found;
};
