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
import { resolve, join } from 'path';
import MongooseProvider from '@/providers/mongoose';
import { LocaleHandler, TaskHandler } from '@/handlers';
import { Logger } from '@/structures';
import { DEFAULT_PREFIX } from '@/constants';

// Import models for the provider
import {
  guildModel,
} from '@/models';

/**
 * Client connecting to the Discord gateway.
 * Creates the handlers and sets them up.
 */
export class Client extends AkairoClient {
  public commands: CommandHandler;
  public events: ListenerHandler;
  public locales: LocaleHandler;
  public scheduler : TaskHandler;
  public logger: Logger;
  public logs: MongooseProvider;
  public application?: Application | null;
  public settings: {
    guilds: MongooseProvider,
    channels: MongooseProvider,
    users: MongooseProvider,
    members: MongooseProvider
  };
  public data: {
    almanax: MongooseProvider;
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
        let prefix = process.env.KROSMOBOT_PREFIX || DEFAULT_PREFIX;
        return message.guild
          ? this.settings.guilds.get(message.guild.id, 'prefix', prefix)
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

    /** Providers */
    this.settings = {
      guilds: new MongooseProvider(GuildModel),
      channels: new MongooseProvider(ChannelModel),
      users: new MongooseProvider(UserModel),
      members: new MongooseProvider(MemberModel)
    };

    this.data = {
      almanax: new MongooseProvider(AlmanaxModel),
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

    this.scheduler
      .loadAll()
      .init();

    await Promise.all(Object.values(this.settings).map((provider) => provider.init()));
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

    [...this.commands.modules.values()].map((command) => {
      if (Array.isArray(command.clientPermissions))
        return [...command.clientPermissions].map((permission) => permissions.add(permission));
      if (['string', 'number'].includes(typeof command.clientPermissions))
        return permissions.add(<number | PermissionResolvable>command.clientPermissions);
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
