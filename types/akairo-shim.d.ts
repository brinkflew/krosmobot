import { LocaleHandler } from '@/handlers';
import { Logger } from '@/structures';
import CustomMongooseProvider from '@/providers/mongoose';

declare module 'discord-akairo' {
  interface AkairoClient {
    commands: CommandHandler;
    events: ListenerHandler;
    locales: LocaleHandler;
    logger: Logger;
    logs: CustomMongooseProvider;
    settings: {
      guilds: CustomMongooseProvider;
      channels: CustomMongooseProvider;
      users: CustomMongooseProvider;
    };
    data: {
      almanax: CustomMongooseProvider;
    };
    invite: string | null;
  }
}
