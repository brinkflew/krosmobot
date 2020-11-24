import {
  AkairoClient,
  AkairoOptions,
  CommandHandler,
  ListenerHandler
} from 'discord-akairo';
import { ClientOptions } from 'discord.js';
import { resolve, join } from 'path';
import MongooseProvider from '@/providers/mongoose';

// Import models for the provider
import { GuildModel } from '@/models';

/**
 * Client connecting to the Discord gateway.
 * Creates the handlers and sets them up.
 */
export class Client extends AkairoClient {
  public settings: {
    guilds: MongooseProvider
  };

  /**
   * @param akairoOptions Options to pass to discord-akairo
   * @param discordOptions Options to pass to discord.js
   */
  constructor(akairoOptions: AkairoOptions, discordOptions: ClientOptions) {
    super(akairoOptions, discordOptions);

    this.commandHandler = new CommandHandler(this, {
      directory: resolve(join(__dirname, '..', 'commands')),
      prefix: '!',
      aliasReplacement: /-/g,
      commandUtil: true,
      handleEdits: true,
      storeMessages: true,
      defaultCooldown: 2000
    });

    this.listenerHandler = new ListenerHandler(this, {
      directory: resolve(join(__dirname, '..', 'events'))
    });

    /** Providers */
    this.settings = {
      guilds: new MongooseProvider(GuildModel)
    };
  }

  /**
   * Initializes the client and loads the handlers.
   */
  public init(): Client {
    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler
    });

    await Promise.all(Object.values(this.settings).map((provider) => provider.init()));
    return this;
  }

  /**
   * Login to the Discord gateway.
   * @param token Token of the Discord bot to boot up
   */
  public async login(token?: string) {
    await this.init();
    return super.login(token);
  }
}
