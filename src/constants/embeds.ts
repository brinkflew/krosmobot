/* eslint-disable @typescript-eslint/naming-convention */

const separator = { name: '\u200B', value: '\u200B' };

export const SEPARATORS = {
  INLINE: { ...separator, inline: true },
  VERTICAL: { ...separator, inline: false }
};

export enum COLORS {
  BLUE = '#5CA5BD',
  CYAN = '#4EDECF',
  DEFAULT = '#C9325D',
  GREEN = '#B8DB7B',
  MAGENTA = '#BD6F9C',
  RED = '#FF7777',
  YELLOW = '#EBC06C'
}
