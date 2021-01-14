import { Message } from 'discord.js';
import { ARGUMENT_TYPE_DIMENSIONS } from '@/constants';

export const dofusDimension = (_message: Message, phrase: string) => {
  if (!phrase) return null;

  const found = ARGUMENT_TYPE_DIMENSIONS.find(names => names.includes(phrase));

  if (!found) return null;
  return found[0];
};
