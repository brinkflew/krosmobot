import {
  AkairoClient,
  AkairoOptions,
  CommandHandler
} from 'discord-akairo';
import { ClientOptions } from 'discord.js';
import { resolve, join } from 'path';

/**
 * Client connecting to the Discord gateway.
 * Creates the handlers and sets them up.
 */
export class Client extends AkairoClient {
  public commandHandler: CommandHandler;

  /**
   * @param akairoOptions Options to pass to discord-akairo
   * @param discordOptions Options to pass to discord.js
   */
  constructor(akairoOptions: AkairoOptions, discordOptions: ClientOptions) {
    super(akairoOptions, discordOptions);

    this.commandHandler = new CommandHandler(this, {
      directory: resolve(join(__dirname, '..', 'commands')),
      prefix: '!'
    });
  }

  /**
   * Initializes the client and loads the handlers.
   */
  public init(): Client {
    this.commandHandler.loadAll();

    return this;
  }
}
