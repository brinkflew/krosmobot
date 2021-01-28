/* eslint-disable @typescript-eslint/naming-convention */

const separator = { name: '\u200B', value: '\u200B' };

export const SEPARATORS = {
  INLINE: { ...separator, inline: true },
  VERTICAL: { ...separator, inline: false }
};

/* eslint-disable @typescript-eslint/naming-convention */
