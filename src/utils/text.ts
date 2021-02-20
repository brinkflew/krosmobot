/**
 * Add thousands separators to a number.
 * @param number Number to format
 */
export const formatNumber = (number: number, separator = ' ') => number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, separator);

/**
 * Pads a number of string with a character to obtain a fixed length string.
 * @param number Number to pad
 * @param length Total length to achieve
 * @param padding Character to use for padding
 */
export const padNumber = (number: number | string, length: number, padding = '0') => {
  if (typeof number === 'number') number = number.toString();

  while (number.length < length) {
    number = `${padding}${number}`;
  }

  return number;
};

/**
 * Split a single string to an array of strings each not exceeding
 * the length defined in width.
 * @param text Text to split
 * @param width Maximum width for each line, in characters
 * @param separator Separator to split the string by
 */
export const splitToArray = (text: string, width: number, separator = ' ') => {
  const split = text.split(separator);
  const joined: string[] = [];
  let index = 0;

  for (const word of split) {
    if (!joined[index]) joined[index] = '';

    if (joined[index].length + word.length <= width) {
      joined[index] = `${joined[index]} ${word}`;
    } else {
      joined[++index] = word;
    }
  }

  return joined;
};

/**
 * Sanitize a string by converting it to lowercase and replacing
 * double characters.
 * @param text String to sanitize
 */
const sanitize = (text: string) => text.toLowerCase().replace(/[^\w\s]|(.)\1/g, '$1');

/**
 * Evaluates the distance between two strings.
 * @param s1 First string to compare
 * @param s2 Second string to compare
 */
export const distance = (s1 = '', s2 = '') => {
  if (!s1.length || !s2.length) return Math.abs(s1.length - s2.length);
  s1 = sanitize(s1);
  s2 = sanitize(s2);
  if (s1 === s2) return 0;

  let counter = 0;
  let offset1 = 0;
  let offset2 = 0;
  let lcs = 0;
  const maxOffset = 5;

  while (counter + offset1 < s1.length && counter + offset2 < s2.length) {
    if (s1.charAt(counter + offset1) === s2.charAt(counter + offset2)) {
      lcs += 1;
      counter += 1;
      continue;
    }

    offset1 = 0;
    offset2 = 0;

    for (let index = 0; index < maxOffset; index++) {
      if (counter + index < s1.length && s1.charAt(counter + index) === s2.charAt(counter)) {
        offset1 += 1;
        break;
      }

      if (counter + index < s2.length && s1.charAt(counter) === s2.charAt(counter + index)) {
        offset2 += 1;
        break;
      }
    }

    counter += 1;
  }

  return ((s1.length + s2.length) / 2) - lcs;
};

/**
 * Finds the closest possible value for a string within a set of candidates.
 * @param text Approximative text to search for within the collections of candidates
 * @param candidates Collection of possible values to test
 * @param threshold Maximum distance between the text and a candidate to be considered a match
 */
export const fuzzy = (text: string, candidates: string[], threshold = 3) => {
  if (!text.length || !candidates.length) return;

  let closestDistance = 0;
  let match = '';

  for (const candidate of candidates) {
    if (text === candidate) return text;

    const measurement = distance(text, candidate);
    if (!closestDistance || measurement < closestDistance) {
      closestDistance = measurement;
      match = candidate;
    }
  }

  if (closestDistance > threshold) return;
  return match;
};

/**
 * Finds the closest possible value for a string within a set of candidates and returns the first
 * item of the match's subcollection.
 * @param text Approximative text to search for within the collections of candidates
 * @param candidates Collection of possible values to test
 * @param threshold Maximum distance between the text and a candidate to be considered a match
 */
export const fuzzy2D = (text: string, candidates: string[][], threshold = 3) => {
  const flattened = (<string[]> []).concat(...candidates);
  const matched = fuzzy(text, flattened, threshold);
  if (!matched) return;
  const found = candidates.find(array => array.includes(matched));
  if (!found) return;
  return found[0];
};
