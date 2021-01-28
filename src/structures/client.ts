import {
  AkairoClient,
  AkairoOptions,
  CommandHandler,
  ListenerHandler
} from 'discord-akairo';
import {
  Application,
  ClientOptions,
  Message,
  Permissions,
  PermissionResolvable
} from 'discord.js';
import Twitter from 'twitter-lite-v2';
import { resolve, join } from 'path';
import MongooseProvider from '@/providers/mongoose';
import { LocaleHandler, TaskHandler } from '@/handlers';
import { Logger } from '@/structures';
import { DEFAULTS } from '@/constants';
import { argumentTypes } from '@/arguments';

// Import models for the provider
import {
  almanax,
  guilds,
  logs,
  members,
  polls,
  reminders,
  users
} from '@/models';

/**
 * Client connecting to the Discord gateway.
 * Creates the handlers and sets them up.
 */
export class Client extends AkairoClient {

  public commands: CommandHandler;
  public events: ListenerHandler;
  public locales: LocaleHandler;
  public scheduler: TaskHandler;
  public twitter: Twitter;
  public logger: Logger;
  public logs: MongooseProvider;
  public application?: Application | null;
  public providers: {
    almanax: MongooseProvider;
    guilds: MongooseProvider;
    members: MongooseProvider;
    polls: MongooseProvider;
    reminders: MongooseProvider;
    users: MongooseProvider;
  };


  /**
   * @param akairoOptions Options to pass to discord-akairo
   * @param discordOptions Options to pass to discord.js
   */
  public constructor(akairoOptions: AkairoOptions, discordOptions: ClientOptions) {
    super(akairoOptions, discordOptions);

    /** Logger */

    this.logs = new MongooseProvider(logs);
    this.logger = new Logger(this);

    /** Providers */

    this.providers = {
      almanax: new MongooseProvider(almanax),
      guilds: new MongooseProvider(guilds),
      members: new MongooseProvider(members),
      polls: new MongooseProvider(polls),
      reminders: new MongooseProvider(reminders),
      users: new MongooseProvider(users)
    };

    /** Handlers */

    this.commands = new CommandHandler(this, {
      directory: resolve(join(__dirname, '..', 'commands')),
      prefix: (message: Message) => message.guild
        ? this.providers.guilds.fetch(message.guild.id)?.settings?.prefix || DEFAULTS.PREFIX
        : DEFAULTS.PREFIX,
      aliasReplacement: /-/g,
      commandUtil: true,
      handleEdits: true,
      storeMessages: true,
      defaultCooldown: 2000,
      automateCategories: true
    });

    for (const [key, type] of Object.entries(argumentTypes)) {
      this.commands.resolver.addType(key, type);
    }

    this.events = new ListenerHandler(this, {
      directory: resolve(join(__dirname, '..', 'events'))
    });

    this.locales = new LocaleHandler(this, {
      directory: resolve(join(__dirname, '..', 'locales'))
    });

    /** Scheduler */

    this.scheduler = new TaskHandler(this, {
      directory: resolve(join(__dirname, '..', 'tasks'))
    });

    /** Twitter client */

    this.twitter = this.getTwitterConnection();
  }

  /**
   * Initializes the client and loads the handlers.
   */
  public async init(): Promise<Client> {
    this.events.setEmitters({
      process,
      commands: this.commands,
      scheduler: this.scheduler
    });

    this.commands
      .loadAll()
      .useListenerHandler(this.events);

    this.events.loadAll();
    this.locales.loadAll();

    this.scheduler
      .loadAll()
      .init();

    await Promise.all(Object.values(this.providers).map(provider => provider.init()));
    return this;
  }

  /**
   * Login to the Discord gateway.
   * @param token Token of the Discord bot to boot up
   */
  public async connect(token?: string): Promise<Client> {
    await this.init();
    await super.login(token);
    this.application = await this.fetchApplication();
    return this;
  }

  /**
   * URL to invite the bot to a new guild.
   * Permissions are calculated automatically based on the rights of the bot
   * in the current server.
   */
  public get invite(): string | null {
    const { application } = this;
    if (!application) return null;

    const permissions = Client.basePermissions;

    [...this.commands.modules.values()].map(command => {
      if (Array.isArray(command.clientPermissions)) {
        return [...command.clientPermissions].map(permission => permissions.add(permission));
      }

      if (['string', 'number'].includes(typeof command.clientPermissions)) {
        return permissions.add(<number | PermissionResolvable>command.clientPermissions);
      }

      return null;
    });

    return `https://discordapp.com/oauth2/authorize?client_id=${application.id}&permissions=${permissions.bitfield}&scope=bot`;
  }

  /**
   * Get the count of users accros all known guilds.
   */
  public get userCount(): number {
    return this.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
  }

  /**
   * Login to Twitter using the credentials provided in the current environment.
   */
  private getTwitterConnection(): Twitter {

    /* eslint-disable @typescript-eslint/naming-convention */
    const {
      KROSMOBOT_TWITTER_CONSUMER_KEY,
      KROSMOBOT_TWITTER_CONSUMER_SECRET,
      KROSMOBOT_TWITTER_BEARER_TOKEN
    } = process.env;

    if (!KROSMOBOT_TWITTER_CONSUMER_KEY || !KROSMOBOT_TWITTER_CONSUMER_SECRET) {
      throw new Error('No Twitter consumer key/secret provided');
    }

    if (!KROSMOBOT_TWITTER_BEARER_TOKEN) {
      throw new Error('No Twitter bearer token provided');
    }

    const twitter = new Twitter({
      version: '2',
      extension: false,
      consumer_key: KROSMOBOT_TWITTER_CONSUMER_KEY,
      consumer_secret: KROSMOBOT_TWITTER_CONSUMER_SECRET,
      bearer_token: KROSMOBOT_TWITTER_BEARER_TOKEN
    });
    /* eslint-enable @typescript-eslint/naming-convention */

    return twitter;
  }

  /**
	 * The base Permissions that the {@link Client#invite} asks for.
   * Defaults to [VIEW_CHANNEL, SEND_MESSAGES].
	 */
  public static basePermissions = new Permissions(3072);

}
