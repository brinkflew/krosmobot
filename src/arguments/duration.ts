import { Message } from 'discord.js';
import {
  MS_PER_SECOND,
  MS_PER_MINUTE,
  MS_PER_HOUR,
  MS_PER_DAY
} from '@/constants';

const parser = /([0-9.,]*)\s?([a-z]*)/i;

/**
 * Converts a string to a timestamp (in ms)
 * @example
 * '2d' => 1000 * 60 * 60 * 24 * 2
 * '30m' => 1000 * 60 * 60 * 30
 * '45s' => 1000 * 60 * 45
 * @param _message Message from which the content is parsed
 * @param phrase Phrase to try to parse
 */
export const duration = (_message: Message, phrase: string) => {
  if (!phrase) return null;
  const parsed = parser.exec(phrase);
  if (!parsed) return null;
  const time = parseInt(parsed[1].replace(',', '.'), 10) || 1;
  if (isNaN(time)) return null;
  const unit = parsed[2][0].toLowerCase() || 'd';

  switch (unit) {
    case 's':
      return time * MS_PER_SECOND;
    case 'm':
      return time * MS_PER_MINUTE;
    case 'h':
      return time * MS_PER_HOUR;
    case 'd':
    case 'j':
    default:
      return time * MS_PER_DAY;
  }
};
