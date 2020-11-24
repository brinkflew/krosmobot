import {
  AkairoClient,
  AkairoOptions,
  CommandHandler,
  ListenerHandler
} from 'discord-akairo';
import { ClientOptions } from 'discord.js';
import { resolve, join } from 'path';

/**
 * Client connecting to the Discord gateway.
 * Creates the handlers and sets them up.
 */
export class Client extends AkairoClient {
  public commandHandler: CommandHandler;
  public listenerHandler: ListenerHandler;

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

    this.listenerHandler = new ListenerHandler(this, {
      directory: resolve(join(__dirname, '..', 'events'))
    });
  }

  /**
   * Initializes the client and loads the handlers.
   */
  public init(): Client {
    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler
    });

    this.commandHandler.loadAll();
    this.listenerHandler.loadAll();
    return this;
  }
}
