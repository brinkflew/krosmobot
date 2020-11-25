/**
 * Logging levels.
 */
export enum LEVELS {
  VERBOSE = 0,
  DEBUG = 1,
  INFO = 2,
  SUCCESS = 3,
  WARNING = 4,
  ERROR = 5,
  WTF = 6
};

/**
 * Colors to use in the console.
 */
export enum COLORS {
  WHITE = '\x1b[39m',
  GREY = '\x1b[90m',
  RED = '\x1b[31m',
  YELLOW = '\x1b[33m',
  GREEN = '\x1b[32m',
  BLUE = '\x1b[34m',
  MAGENTA = '\x1b[35m',
  RESET = '\x1b[0m'
};

/**
 * Symbols to use in the console, specific to the debug level
 * of the printed information.
 */
export enum SYMBOLS {
  VERBOSE = '%',
  DEBUG = '#',
  INFO = '*',
  SUCCESS = '+',
  WARNING = '!',
  ERROR = '-',
  WTF = '?'
}

/**
 * Maps a color to a loglevel.
 * @param level Level to find the color for
 */
export const getColor = (level: number): string => {
  switch (level) {
    case LEVELS.VERBOSE: return COLORS.GREY;
    case LEVELS.DEBUG: return COLORS.WHITE;
    case LEVELS.INFO: return COLORS.BLUE;
    case LEVELS.SUCCESS: return COLORS.GREEN;
    case LEVELS.WARNING: return COLORS.YELLOW;
    case LEVELS.ERROR: return COLORS.RED;
    case LEVELS.WTF: return COLORS.MAGENTA;
    default: return COLORS.WHITE;
  }
};

/**
 * Maps a symbol to a loglevel.
 * @param level Level to find the symbol for
 */
export const getSymbol = (level: number): string => {
  switch (level) {
    case LEVELS.VERBOSE: return SYMBOLS.VERBOSE;
    case LEVELS.DEBUG: return SYMBOLS.DEBUG;
    case LEVELS.INFO: return SYMBOLS.INFO;
    case LEVELS.SUCCESS: return SYMBOLS.SUCCESS;
    case LEVELS.WARNING: return SYMBOLS.WARNING;
    case LEVELS.ERROR: return SYMBOLS.ERROR;
    case LEVELS.WTF: return SYMBOLS.WTF;
    default: return SYMBOLS.INFO;
  }
};

/**
 * Maps a name to a loglevel.
 * @param level Level to find the name for
 */
export const getName = (level: number): string => {
    switch (level) {
    case LEVELS.VERBOSE: return 'VERBOSE';
    case LEVELS.DEBUG: return 'DEBUG';
    case LEVELS.INFO: return 'INFO';
    case LEVELS.SUCCESS: return 'SUCCESS';
    case LEVELS.WARNING: return 'WARNING';
    case LEVELS.ERROR: return 'ERROR';
    case LEVELS.WTF: return 'WTF';
    default: return 'INFO';
  }
}
