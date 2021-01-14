import { Message } from 'discord.js';
import { ARGUMENT_TYPE_JOB } from '@/constants';

export const dofusJob = (_message: Message, phrase: string) => {
  if (!phrase) return null;

  const found = ARGUMENT_TYPE_JOB.find(names => names.includes(phrase));

  if (!found) return null;
  return found[0];
};
