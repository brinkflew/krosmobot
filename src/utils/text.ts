/**
 * Add thousands separators to a number.
 * @param number Number to format
 */
export const formatNumber = (number: number, separator = ' ') => number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, separator);

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
