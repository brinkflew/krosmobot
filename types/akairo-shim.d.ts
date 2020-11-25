import { LocaleHandler } from '@/handlers';

declare module 'discord-akairo' {
  interface AkairoClient {
    commands: CommandHandler,
    events: ListenerHandler,
    locales: LocaleHandler,
    settings: {
      guilds: MongooseProvider,
      channels: MongooseProvider,
      users: MongooseProvider,
    }
  }
}
