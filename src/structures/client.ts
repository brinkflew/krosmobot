import {
  AkairoClient,
  AkairoOptions,
  CommandHandler,
  ListenerHandler
} from 'discord-akairo';
import { ClientOptions, Message } from 'discord.js';
import { resolve, join } from 'path';
import MongooseProvider from '@/providers/mongoose';
import { LocaleHandler } from '@/handlers';
import { Logger } from '@/structures';

// Import models for the provider
import {
  GuildModel,
  ChannelModel,
  UserModel,
  LogModel
} from '@/models';

/**
 * Client connecting to the Discord gateway.
 * Creates the handlers and sets them up.
 */
export class Client extends AkairoClient {
  public commands: CommandHandler;
  public events: ListenerHandler;
  public locales: LocaleHandler;
  public logger: Logger;
  public logs: MongooseProvider;
  public settings: {
    guilds: MongooseProvider,
    channels: MongooseProvider,
    users: MongooseProvider
  };

  /**
   * @param akairoOptions Options to pass to discord-akairo
   * @param discordOptions Options to pass to discord.js
   */
  constructor(akairoOptions: AkairoOptions, discordOptions: ClientOptions) {
    super(akairoOptions, discordOptions);

    /** Logger */

    this.logs = new MongooseProvider(LogModel);
    this.logger = new Logger(this);

    /** Handlers */

    this.commands = new CommandHandler(this, {
      directory: resolve(join(__dirname, '..', 'commands')),
      prefix: (message: Message) => {
        let prefix = process.env.KROSMOBOT_PREFIX || '!';
        return message.guild
          ? this.settings.guilds.get(message.guild.id, 'prefix', prefix)
          : prefix;
      },
      aliasReplacement: /-/g,
      commandUtil: true,
      handleEdits: true,
      storeMessages: true,
      defaultCooldown: 2000
    });

    this.events = new ListenerHandler(this, {
      directory: resolve(join(__dirname, '..', 'events'))
    });

    this.locales = new LocaleHandler(this, {
      directory: resolve(join(__dirname, '..', 'locales'))
    });

    /** Providers */
    this.settings = {
      guilds: new MongooseProvider(GuildModel),
      channels: new MongooseProvider(ChannelModel),
      users: new MongooseProvider(UserModel)
    };
  }

  /**
   * Initializes the client and loads the handlers.
   */
  private async init(): Promise<Client> {
    this.events.setEmitters({ process: process });

    this.commands.loadAll();
    this.events.loadAll();
    this.locales.loadAll();

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
