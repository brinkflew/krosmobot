import { Client } from '@/structures';
import { oneLine } from 'common-tags';
import { nanoid } from 'nanoid';

// Tympings
import { LoggerOptions } from 'types/types';

// Constants
import { LEVELS, COLORS, getColor, getSymbol, getName } from '@/constants/logger';

/**
 * Logs information to both the standard output and a provider.
 * @param client Client to link the logger to
 */
export class Logger {
  public client: Client;
  public levels = LEVELS;
  public stdout: NodeJS.WriteStream & { fd: 1 };
  public stderr: NodeJS.WriteStream & { fd: 2 };
  public colors: boolean;
  public lineLength: number;
  
  constructor(client: Client, options: LoggerOptions = {}) {
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
  public log(description: string | Error, level: number = LEVELS.INFO, timestamp: number = Date.now()): Logger {
    if (level < parseInt(process.env.KROSMOBOT_LOG_LEVEL || LEVELS.INFO.toString())) return this;
    this.writeToProvider(description, level, timestamp);
    this.writeToConsole(description, level, timestamp);
    return this;
  }

  /**
   * Logs a verbose message.
   * @param description Message to log
   * @param timestamp Timestamp
   */
  public verbose(description: string, timestamp = Date.now()): Logger {
    return this.log(description, LEVELS.VERBOSE, timestamp);
  }

  /**
   * Logs a debug message.
   * @param description Message to log
   * @param timestamp Timestamp
   */
  public debug(description: string, timestamp = Date.now()): Logger {
    return this.log(description, LEVELS.DEBUG, timestamp);
  }

  /**
   * Logs an informative message.
   * @param description Message to log
   * @param timestamp Timestamp
   */
  public info(description: string, timestamp = Date.now()): Logger {
    return this.log(description, LEVELS.INFO, timestamp);
  }

  /**
   * Logs a success message.
   * @param description Message to log
   * @param timestamp Timestamp
   */
  public ok(description: string, timestamp = Date.now()): Logger {
    return this.log(description, LEVELS.SUCCESS, timestamp);
  }

  /**
   * Logs a warning message.
   * @param description Message to log
   * @param timestamp Timestamp
   */
  public warn(description: string, timestamp = Date.now()): Logger {
    return this.log(description, LEVELS.WARNING, timestamp);
  }

  /**
   * Logs an error message.
   * @param description Message to log
   * @param timestamp Timestamp
   */
  public error(description: string | Error, timestamp = Date.now()): Logger {
    return this.log(description, LEVELS.ERROR, timestamp);
  }

  /**
   * Logs a 'what the f*ck just happened here?!' message.
   * @param description Message to log
   * @param timestamp Timestamp
   */
  public wtf(description: string, timestamp = Date.now()): Logger {
    return this.log(description, LEVELS.WTF, timestamp);
  }

  /**
   * Prints a formatted message to the strandard output.
   * @param description Message to log
   * @param level Loglevel for this entry
   * @param timestamp Timestamp to log
   * @param length Max length for the printed line
   * @param oneline Whether to write the whole description on a single line
   */
  private writeToConsole(description: string | Error, level: number = LEVELS.INFO, timestamp: number = Date.now(), length: number = this.lineLength, oneline = false): boolean {
    let output: NodeJS.WriteStream & { fd: 1 | 2 } = this.stdout;
    
    if (description instanceof Error || level === LEVELS.ERROR) {
      if (!(description instanceof Error)) description = new Error(description);
      level = LEVELS.ERROR;
      description = `${COLORS.RED}${description.message}${description.stack ? `\n${COLORS.GREY}${description.stack}` : ''}`;
      output = this.stderr;
    }

    let date = `[ ${new Date(timestamp).toUTCString()} ]`;
    let symbol = `[${getSymbol(level)}]`;

    if (this.colors) {
      date = `${COLORS.GREY}${date}`;
      symbol = `${getColor(level)}${symbol}`;
    }

    description = `${date} ${symbol}${COLORS.RESET} ${description}\n`;

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
  private writeToProvider(description: string | Error, level: number = LEVELS.INFO, timestamp: number = Date.now()): Promise<any> {
    if (description instanceof Error)
      description = description.stack ? `${description.message}\n${description.stack}` : description.message;
    return this.client.logs.set(
      parseInt(nanoid(24), 36).toString(),
      ['level', 'message', 'timestamp'],
      [getName(level), description, timestamp]
    );
  }
}
