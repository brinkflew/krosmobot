import { Message } from 'discord.js';
import { ARGUMENTS } from '@/constants';

export const dofusDimension = (_message: Message, phrase: string) => {
  if (!phrase) return null;

  const found = ARGUMENTS.DOFUS_DIMENSIONS.find(names => names.includes(phrase));

  if (!found) return null;
  return found[0];
};
