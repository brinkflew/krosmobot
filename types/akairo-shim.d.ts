import { Application } from 'discord.js';
import { LocaleHandler } from '@/handlers';
import { Logger } from '@/structures';

declare module 'discord-akairo' {
  interface AkairoClient {
    commands: CommandHandler,
    events: ListenerHandler,
    locales: LocaleHandler,
    logger: Logger,
    logs: MongooseProvider,
    settings: {
      guilds: MongooseProvider,
      channels: MongooseProvider,
      users: MongooseProvider
    }
    invite: string | null;
  }
}
