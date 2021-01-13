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
import Twitter, { Stream } from 'twitter-lite';
import { resolve, join } from 'path';
import MongooseProvider from '@/providers/mongoose';
import { LocaleHandler, TaskHandler } from '@/handlers';
import { Logger } from '@/structures';
import { DEFAULT_PREFIX, TWITTER_USERS } from '@/constants';

// Import models for the provider
import { models } from '@/models';

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
  public streams: Stream[] = [];
  public logger: Logger;
  public logs: MongooseProvider;
  public application?: Application | null;
  public providers: { [key: string]: MongooseProvider } = {};


  /**
   * @param akairoOptions Options to pass to discord-akairo
   * @param discordOptions Options to pass to discord.js
   */
  public constructor(akairoOptions: AkairoOptions, discordOptions: ClientOptions) {
    super(akairoOptions, discordOptions);

    /** Logger */

    this.logs = new MongooseProvider(models.logs);
    this.logger = new Logger(this);

    /** Providers */

    for (const [key, model] of Object.entries(models)) {
      this.providers[key] = new MongooseProvider(model);
    }

    /** Handlers */

    this.commands = new CommandHandler(this, {
      directory: resolve(join(__dirname, '..', 'commands')),
      prefix: (message: Message) => {
        const prefix = process.env.KROSMOBOT_PREFIX || DEFAULT_PREFIX;
        return message.guild
          ? this.providers.guilds.get(message.guild.id, 'prefix', prefix)
          : prefix;
      },
      aliasReplacement: /-/g,
      commandUtil: true,
      handleEdits: true,
      storeMessages: true,
      defaultCooldown: 2000,
      automateCategories: true
    });

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

    /* eslint-disable @typescript-eslint/naming-convention */
    const {
      KROSMOBOT_TWITTER_CONSUMER_KEY,
      KROSMOBOT_TWITTER_CONSUMER_SECRET,
      KROSMOBOT_TWITTER_ACCESS_TOKEN,
      KROSMOBOT_TWITTER_ACCESS_TOKEN_SECRET
    } = process.env;

    if (!KROSMOBOT_TWITTER_CONSUMER_KEY || !KROSMOBOT_TWITTER_CONSUMER_SECRET) {
      throw new Error('No Twitter consumer key/secret provided');
    }

    if (!KROSMOBOT_TWITTER_ACCESS_TOKEN || !KROSMOBOT_TWITTER_ACCESS_TOKEN_SECRET) {
      throw new Error('No Twitter access token/secret provided');
    }

    this.twitter = new Twitter({
      consumer_key: KROSMOBOT_TWITTER_CONSUMER_KEY,
      consumer_secret: KROSMOBOT_TWITTER_CONSUMER_SECRET,
      access_token_key: KROSMOBOT_TWITTER_ACCESS_TOKEN,
      access_token_secret: KROSMOBOT_TWITTER_ACCESS_TOKEN_SECRET
    });
    /* eslint-enable @typescript-eslint/naming-convention */
  }

  /**
   * Initializes the client and loads the handlers.
   */
  public async init(): Promise<Client> {
    const stream = this.streamTweets();

    this.events.setEmitters({
      process,
      twitter: stream
    });

    this.commands.loadAll();
    this.events.loadAll();
    this.locales.loadAll();

    this.scheduler
      .loadAll()
      .init();

    await Promise.all(Object.values(this.providers).map(provider => provider.init()));
    return this;
  }

  /**
   * Initilaizes streaming tweets from various accounts.
   * @param follow IDs of accounts to follow
   */
  public streamTweets(): Stream {
    this.streams.map(stream => process.nextTick(() => stream.destroy()));

    const stream = this.twitter.stream('statuses/filter', { follow: TWITTER_USERS.join(',') });
    this.streams.push(stream);

    return stream;
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
	 * The base Permissions that the {@link Client#invite} asks for.
   * Defaults to [VIEW_CHANNEL, SEND_MESSAGES].
	 */
  public static basePermissions = new Permissions(3072);

}
