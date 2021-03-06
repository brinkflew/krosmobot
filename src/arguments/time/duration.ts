import { Message } from 'discord.js';
import { TIME } from '@/constants';

/**
 * Matches the format of the duration argument.
 */
export const matcher = /([0-9.,]+)(.)?/i;

const units = ['s', 'm', 'h', 'd', 'j'];

/**
 * Converts a string to a timestamp (in ms)
 * @example
 * '2d' => 1000 * 60 * 60 * 24 * 2
 * '10h' => 1000 * 60 * 60 * 10
 * '45m' => 1000 * 60 * 45
 * '15s' => 1000 * 15
 * @param _message Message from which the content is parsed
 * @param phrase Phrase to try to parse
 */
export const duration = (_message: Message, phrase: string) => {
  if (!phrase.length) return null;
  const parsed = matcher.exec(phrase);
  if (!parsed) return null;
  const time = parsed[1] ? parseFloat(parsed[1].replace(',', '.')) : 1;
  const unit = units.includes(parsed[2]) ? parsed[2][0].toLowerCase() : 'd';

  switch (unit) {
    case units[0]:
      return time * TIME.MS_PER_SECOND;
    case units[1]:
      return time * TIME.MS_PER_MINUTE;
    case units[2]:
      return time * TIME.MS_PER_HOUR;
    case units[3]:
    case units[4]:
      return time * TIME.MS_PER_DAY;
    default:
      return null;
  }
};
