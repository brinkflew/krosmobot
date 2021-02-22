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
import { Model } from 'mongoose';
import Twitter from 'twitter-lite-v2';
import { resolve, join } from 'path';
import '@/extensions';
import { MongooseCachedProvider, MongooseProvider } from '@/providers';
import { LocaleHandler, TaskHandler, MetricHandler } from '@/handlers';
import { Logger } from '@/structures';
import { DEFAULTS, TIME } from '@/constants';
import { argumentTypes } from '@/arguments';
import { formatRelative } from '@/utils';

// Import models for the provider
import {
  almanax,
  guilds,
  issues,
  logs,
  members,
  polls,
  reminders,
  users
} from '@/models';

import {
  AlmanaxDocument,
  GuildDocument,
  IssueDocument,
  LogDocument,
  MemberDocument,
  PollDocument,
  ReminderDocument,
  UserDocument
} from 'types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const PROMPT_TIME_LIMIT = TIME.MS_PER_MINUTE * 5;

/**
 * Client connecting to the Discord gateway.
 * Creates the handlers and sets them up.
 */
export class Client extends AkairoClient {

  public crons: Set<NodeJS.Timeout>;
  public commands: CommandHandler;
  public events: ListenerHandler;
  public locales: LocaleHandler;
  public scheduler: TaskHandler;
  public metrics: MetricHandler;
  public twitter: Twitter;
  public logger: Logger;
  public application?: Application | null;
  public providers: {
    almanax: MongooseCachedProvider<AlmanaxDocument>;
    guilds: MongooseCachedProvider<GuildDocument>;
    issues: MongooseCachedProvider<IssueDocument>;
    logs: MongooseProvider<LogDocument>;
    members: MongooseCachedProvider<MemberDocument>;
    polls: MongooseCachedProvider<PollDocument>;
    reminders: MongooseCachedProvider<ReminderDocument>;
    users: MongooseCachedProvider<UserDocument>;
  };


  /**
   * @param akairoOptions Options to pass to discord-akairo
   * @param discordOptions Options to pass to discord.js
   */
  public constructor(akairoOptions: AkairoOptions, discordOptions: ClientOptions) {
    super(akairoOptions, discordOptions);
    this.crons = new Set();

    /** Providers */

    this.providers = {
      almanax: new MongooseCachedProvider(this, almanax as Model<AlmanaxDocument, Record<string, unknown>>),
      guilds: new MongooseCachedProvider(this, guilds as Model<GuildDocument, Record<string, unknown>>),
      issues: new MongooseCachedProvider(this, issues as Model<IssueDocument, Record<string, unknown>>),
      logs: new MongooseProvider(this, logs),
      members: new MongooseCachedProvider(this, members as Model<MemberDocument, Record<string, unknown>>),
      polls: new MongooseCachedProvider(this, polls as Model<PollDocument, Record<string, unknown>>),
      reminders: new MongooseCachedProvider(this, reminders as Model<ReminderDocument, Record<string, unknown>>),
      users: new MongooseCachedProvider(this, users as Model<UserDocument, Record<string, unknown>>)
    };

    /** Logger */

    this.logger = new Logger(this);

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
      automateCategories: true,
      argumentDefaults: {
        prompt: {
          time: PROMPT_TIME_LIMIT,
          retries: 1,
          modifyStart: (message: Message, text: string) =>
            `${text}\n${message.t('MODIFY_PROMPT_CANCEL_OR_TIMEOUT', formatRelative(PROMPT_TIME_LIMIT, message.locale))}`,
          timeout: (message: Message) => message.t('DEFAULT_PROMPT_TIMEOUT'),
          cancel: (message: Message) => message.t('DEFAULT_PROMPT_CANCEL'),
          ended: (message: Message) => message.t('DEFAULT_PROMPT_ENDED'),
          retry: (message: Message) => message.t('DEFAULT_PROMPT_RETRY')
        }
      }
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

    this.metrics = new MetricHandler(this, {
      directory: resolve(join(__dirname, '..', 'metrics'))
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
    this.metrics
      .loadAll()
      .init();

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
        return permissions.add(<number | PermissionResolvable> command.clientPermissions);
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
