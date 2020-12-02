/* eslint-disable @typescript-eslint/naming-convention */

import { Client } from '@/structures';
import { oneLine } from 'common-tags';
import { nanoid } from 'nanoid';

// Typings
import { LoggerOptions } from 'types/types';

/**
 * Logs information to both the standard output and a provider.
 * @param client Client to link the logger to
 */
export class Logger {

  public client: Client;
  public stdout: NodeJS.WriteStream & { fd: 1 };
  public stderr: NodeJS.WriteStream & { fd: 2 };
  public colors: boolean;
  public lineLength: number;

  public constructor(client: Client, options: LoggerOptions = {}) {
    this.client = client;
    this.stdout = options.stdout || process.stdout;
    this.stderr = options.stderr || process.stderr;
    this.colors = options.colors || true;
    this.lineLength = options.lineLength || 0;
  }

  /**
   * Logs a message to both the standard output and the logs provider.
   * @param description Message to log
   * @param level Loglevel
   * @param timestamp Timestamp
   */
  public log(description: string | Error, level: number = Logger.LEVELS.INFO, timestamp: number = Date.now()): Logger {
    if (level < (parseInt(process.env.KROSMOBOT_LOG_LEVEL || Logger.LEVELS.INFO.toString(), 10))) return this;
    void this.writeToProvider(description, level, timestamp);
    this.writeToConsole(description, level, timestamp);
    return this;
  }

  /**
   * Logs a verbose message.
   * @param description Message to log
   * @param timestamp Timestamp
   */
  public verbose(description: string, timestamp = Date.now()): Logger {
    return this.log(description, Logger.LEVELS.VERBOSE, timestamp);
  }

  /**
   * Logs a debug message.
   * @param description Message to log
   * @param timestamp Timestamp
   */
  public debug(description: string, timestamp = Date.now()): Logger {
    return this.log(description, Logger.LEVELS.DEBUG, timestamp);
  }

  /**
   * Logs an informative message.
   * @param description Message to log
   * @param timestamp Timestamp
   */
  public info(description: string, timestamp = Date.now()): Logger {
    return this.log(description, Logger.LEVELS.INFO, timestamp);
  }

  /**
   * Logs a success message.
   * @param description Message to log
   * @param timestamp Timestamp
   */
  public success(description: string, timestamp = Date.now()): Logger {
    return this.log(description, Logger.LEVELS.SUCCESS, timestamp);
  }

  /**
   * Logs a warning message.
   * @param description Message to log
   * @param timestamp Timestamp
   */
  public warning(description: string, timestamp = Date.now()): Logger {
    return this.log(description, Logger.LEVELS.WARNING, timestamp);
  }

  /**
   * Logs an error message.
   * @param description Message to log
   * @param timestamp Timestamp
   */
  public error(description: string | Error, timestamp = Date.now()): Logger {
    return this.log(description, Logger.LEVELS.ERROR, timestamp);
  }

  /**
   * Logs a 'what the f*ck just happened here?!' message.
   * @param description Message to log
   * @param timestamp Timestamp
   */
  public wtf(description: string, timestamp = Date.now()): Logger {
    return this.log(description, Logger.LEVELS.WTF, timestamp);
  }

  /**
   * Prints a formatted message to the strandard output.
   * @param description Message to log
   * @param level Loglevel for this entry
   * @param timestamp Timestamp to log
   * @param length Max length for the printed line
   * @param oneline Whether to write the whole description on a single line
   */
  private writeToConsole(description: string | Error, level: number = Logger.LEVELS.INFO, timestamp: number = Date.now(), length: number = this.lineLength, oneline = false): boolean {
    let output: NodeJS.WriteStream & { fd: 1 | 2 } = this.stdout;

    if (description instanceof Error || level === Logger.LEVELS.ERROR) {
      if (!(description instanceof Error)) description = new Error(description);
      level = Logger.LEVELS.ERROR;
      description = `${Logger.COLORS.RED}${description.message}${description.stack ? `\n${Logger.COLORS.GREY}${description.stack}` : ''}`;
      output = this.stderr;
    }

    let date = `[ ${new Date(timestamp).toUTCString()} ]`;
    let symbol = `[${Logger.symbol(level)}]`;

    if (this.colors) {
      date = `${Logger.COLORS.GREY}${date}`;
      symbol = `${Logger.color(level)}${symbol}`;
    }

    description = `${date} ${symbol}${Logger.COLORS.RESET} ${description}\n`;

    if (oneline) description = oneLine`${description}`;
    if (oneline && length && description.length > length) {
      const terminator = '...';
      description = description.substring(0, length - terminator.length).trim() + terminator;
    }

    return output.write(description, 'utf-8');
  }

  /**
   * Saves a message to the logs provider.
   * @param description Message to log
   * @param level Loglevel
   * @param timestamp Timestamp
   */
  private writeToProvider(description: string | Error, level: number = Logger.LEVELS.INFO, timestamp: number = Date.now()): Promise<any> {
    if (description instanceof Error) {
      description = description.stack ? `${description.message}\n${description.stack}` : description.message;
    }

    return this.client.logs.set(
      nanoid(24),
      ['level', 'message', 'timestamp'],
      [Logger.level(level), description, timestamp]
    );
  }

  public static COLORS = {
    WHITE: '\x1b[39m',
    GREY: '\x1b[90m',
    RED: '\x1b[31m',
    YELLOW: '\x1b[33m',
    GREEN: '\x1b[32m',
    BLUE: '\x1b[34m',
    MAGENTA: '\x1b[35m',
    RESET: '\x1b[0m'
  };

  public static LEVELS = {
    VERBOSE: 0,
    DEBUG: 1,
    INFO: 2,
    SUCCESS: 3,
    WARNING: 4,
    ERROR: 5,
    WTF: 6
  };

  public static SYMBOLS = {
    VERBOSE: '%',
    DEBUG: '#',
    INFO: '*',
    SUCCESS: '+',
    WARNING: '!',
    ERROR: '-',
    WTF: '?'
  };

  /**
   * Maps a color to a loglevel.
   * @param level Level to find the color for
   */
  public static color(level: number): string {
    switch (level) {
      case Logger.LEVELS.VERBOSE: return Logger.COLORS.GREY;
      case Logger.LEVELS.DEBUG: return Logger.COLORS.WHITE;
      case Logger.LEVELS.INFO: return Logger.COLORS.BLUE;
      case Logger.LEVELS.SUCCESS: return Logger.COLORS.GREEN;
      case Logger.LEVELS.WARNING: return Logger.COLORS.YELLOW;
      case Logger.LEVELS.ERROR: return Logger.COLORS.RED;
      case Logger.LEVELS.WTF: return Logger.COLORS.MAGENTA;
      default: return Logger.COLORS.WHITE;
    }
  }

  /**
   * Maps a symbol to a loglevel.
   * @param level Level to find the symbol for
   */
  public static symbol(level: number): string {
    switch (level) {
      case Logger.LEVELS.VERBOSE: return Logger.SYMBOLS.VERBOSE;
      case Logger.LEVELS.DEBUG: return Logger.SYMBOLS.DEBUG;
      case Logger.LEVELS.INFO: return Logger.SYMBOLS.INFO;
      case Logger.LEVELS.SUCCESS: return Logger.SYMBOLS.SUCCESS;
      case Logger.LEVELS.WARNING: return Logger.SYMBOLS.WARNING;
      case Logger.LEVELS.ERROR: return Logger.SYMBOLS.ERROR;
      case Logger.LEVELS.WTF: return Logger.SYMBOLS.WTF;
      default: return Logger.SYMBOLS.INFO;
    }
  }

  /**
   * Maps a name to a loglevel.
   * @param level Level to find the name for
   */
  public static level(level: number): string {
    switch (level) {
      case Logger.LEVELS.VERBOSE: return 'VERBOSE';
      case Logger.LEVELS.DEBUG: return 'DEBUG';
      case Logger.LEVELS.INFO: return 'INFO';
      case Logger.LEVELS.SUCCESS: return 'SUCCESS';
      case Logger.LEVELS.WARNING: return 'WARNING';
      case Logger.LEVELS.ERROR: return 'ERROR';
      case Logger.LEVELS.WTF: return 'WTF';
      default: return 'INFO';
    }
  }

}
