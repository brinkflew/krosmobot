import { Message } from 'discord.js';

/**
 * Converts a date string to a timestamp (in ms)
 * @param _message Message from which the content is parsed
 * @param phrase Phrase to try to parse
 */
export const date = (_message: Message, phrase: string) => {
  if (!phrase) return null;

  const matches = /^(([0-2]?[0-9])|(3[0-1]))([/.\s:-])?((1[0-2])|(0?[0-9]))?([/.\s:-])?([0-9]{4}|[0-9]{2})?/i.exec(phrase);
  if (!matches) return null;

  const datetime = new Date();
  datetime.setHours(1, 0, 0, 0);

  if (matches[9]) {
    let year = parseInt(matches[9], 10);
    if (year < 100) year += 2000;
    datetime.setFullYear(year);
  }

  if (matches[5]) datetime.setMonth(parseInt(matches[5], 10));
  if (matches[1]) datetime.setDate(parseInt(matches[1], 10));
  return datetime.valueOf();
};
