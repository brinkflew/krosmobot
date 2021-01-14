/**
 * Add thousands separators to a number.
 * @param number Number to format
 */
export const formatNumber = (number: number) => number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ' ');
