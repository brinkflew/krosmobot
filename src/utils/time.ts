import { Locale } from '@/structures';
import {
  MS_PER_SECOND,
  MS_PER_MINUTE,
  MS_PER_HOUR,
  MS_PER_DAY,
  MS_PER_MONTH,
  MS_PER_YEAR
} from '@/constants';

/**
 * Convert seconds to milliseconds.
 * @param seconds Seconds
 */
export const s2ms = (seconds: number) => seconds * 1000;

/**
 * Convert nanoseconds to milliseconds.
 * @param nanoseconds Nanoseconds
 */
export const ns2ms = (nanoseconds: number) => nanoseconds / 10e5;

/**
 * Convert high-resolution timings (such as those returned by `process.hrtime()`)
 * to nanoseconds.
 * @param hrtime High-resolution timings
 */
export const hr2ms = (hrtime: [number, number]) => s2ms(hrtime[0]) + ns2ms(hrtime[1]);

/**
 * Gets the time (in milliseconds) elapsed between two timestamps or hoght-resolution timings
 * (such as those returned by `process.hrtime()`).
 * @param start Start time
 * @param end End time
 */
export const relative = (start: number | [number, number], end: number | [number, number]) => {
  if (Array.isArray(start)) start = hr2ms(start);
  if (Array.isArray(end)) end = hr2ms(end);
  return end - start;
};

/**
 * Format a timestamp to a human-readable date
 * @param timestamp Date to format, in milliseconds
 * @param locale Locale to format the date in
 * @param long Whether to use the longer format
 * @param include Whether to format as a date, time or both
 */
export const formatDate = (timestamp: number, locale = 'en', long = false, include: 'time' | 'date' | 'both' = 'both') => {
  const date = new Date(timestamp);
  const includeDate = include === 'date' || include === 'both';
  const includeTime = include === 'time' || include === 'both';

  return new Intl.DateTimeFormat(locale, {
    weekday: long ? 'long' : undefined,
    year: includeDate ? 'numeric' : undefined,
    month: includeDate ? (long ? 'long' : '2-digit') : undefined,
    day: includeDate ? '2-digit' : undefined,
    hour: includeTime ? '2-digit' : undefined,
    minute: includeTime ? '2-digit' : undefined,
    second: includeTime ? '2-digit' : undefined
  }).format(date);
};

/**
 * Gets a human-readable version of a timestamp considering it as time elapsed.
 * @param elapsed Time elapsed in milliseconds
 * @param locale Locale to use for formatting
 */
export const formatRelative = (elapsed: number, locale: Locale) => {
  const round = (unit: number) => Math.round(elapsed / unit);
  if (elapsed < MS_PER_MINUTE) return locale.translate('TIMING_SECOND', round(MS_PER_SECOND));
  if (elapsed < MS_PER_HOUR) return locale.translate('TIMING_MINUTE', round(MS_PER_MINUTE));
  if (elapsed < MS_PER_DAY) return locale.translate('TIMING_HOUR', round(MS_PER_HOUR));
  if (elapsed < MS_PER_MONTH) return locale.translate('TIMING_DAY', round(MS_PER_DAY));
  if (elapsed < MS_PER_YEAR) return locale.translate('TIMING_MONTH', round(MS_PER_MONTH));
  return locale.translate('TIMING_YEAR', round(MS_PER_YEAR));
};

/**
 * Formats a timestamp either as a date or as time elpsed so that it can be easily read by humans.
 * @param time Time to format, in milliseconds or high-resolution time
 * @param mode Format as a date (i.e. 16/01/2021) or as elapsed time (i.e. 30 minutes)
 * @param locale Locale to use for formatting; must be either an ISO code for the language in date mode
 *  or a Locale object in relative mode
 * @param args In date mode, options to pass to `formatDate()`
 */
export const format = (time: number | [number, number], mode: 'date' | 'relative' = 'date', locale?: string | Locale, ...args: [boolean | undefined, 'time' | 'date' | 'both' | undefined] | []) => {
  if (Array.isArray(time)) time = hr2ms(time);

  if (mode === 'relative') {
    if (!(locale instanceof Locale)) throw new TypeError(`'locale' must be an instance of Locale when using relative mode`);
    return formatRelative(time, locale);
  }

  if (typeof locale !== 'string') throw new TypeError(`'locale' must be a string when using date mode`);
  return formatDate(time, locale, args[0], args[1]);
};
