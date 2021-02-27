import { Message } from 'discord.js';

/**
 * Converts a time string to a timestamp (in ms)
 * @param _message Message from which the content is parsed
 * @param phrase Phrase to try to parse
 */
export const time = (_message: Message, phrase: string) => {
  if (!phrase) return null;

  const matches = /^(2[0-3]|[0-1]?[0-9])([/.\s:h-])?([0-5]?[0-9])?([/.\s:m-])?([0-5]?[0-9])?/i.exec(phrase);
  if (!matches) return null;

  const datetime = new Date(0);

  if (matches[1]) datetime.setHours(parseInt(matches[1], 10));
  if (matches[3]) datetime.setMinutes(parseInt(matches[3], 10));
  if (matches[5]) datetime.setSeconds(parseInt(matches[5], 10));
  return datetime.valueOf();
};
