/**
 * Add thousands separators to a number.
 * @param number Number to format
 */
export const formatNumber = (number: number, separator = ' ') => number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, separator);
