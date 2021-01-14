/* eslint-disable @typescript-eslint/naming-convention */

import * as argumentTypes from './arguments';
import defaults from './defaults';
import * as embeds from './embeds';
export * from './urls';

// Defaults
export const DEFAULT_PREFIX = defaults.PREFIX;
export const DEFAULT_CLIENTNAME = defaults.CLIENTNAME;
export const DEFAULT_LOCALE = defaults.LOCALE;

// Embeds
export const INLINE_SEPARATOR = embeds.SEPARATORS.INLINE;
export const VERTICAL_SEPARATOR = embeds.SEPARATORS.VERTICAL;
export const EMBED_COLOR_BLUE = embeds.COLORS.BLUE;
export const EMBED_COLOR_CYAN = embeds.COLORS.CYAN;
export const EMBED_COLOR_GREEN = embeds.COLORS.GREEN;
export const EMBED_COLOR_MAGENTA = embeds.COLORS.MAGENTA;
export const EMBED_COLOR_RED = embeds.COLORS.RED;
export const EMBED_COLOR_YELLOW = embeds.COLORS.YELLOW;
export const EMBED_COLOR_DEFAULT = embeds.COLORS.DEFAULT;

// Arguments
export const ARGUMENT_TYPE_JOB = argumentTypes.jobs;
export const ARGUMENT_TYPE_DIMENSIONS = argumentTypes.dimensions;
