import { Message } from 'discord.js';

export const dofusCoordinates = (_message: Message, phrase: string) => {
  if (!phrase) return null;
  const parsed = /(-?[0-9]{1,3})[\s.;,:|]+(-?[0-9]{1,3})/i.exec(phrase);
  if (!parsed) return null;
  return { x: parseInt(parsed[1], 10), y: parseInt(parsed[2], 10), world: 'main' };
};
