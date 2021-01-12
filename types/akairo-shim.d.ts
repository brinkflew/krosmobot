import Twitter, { Stream } from 'twitter-lite';
import { LocaleHandler, TaskHandler } from '@/handlers';
import { Logger } from '@/structures';
import CustomMongooseProvider from '@/providers/mongoose';

declare module 'discord-akairo' {
  export interface AkairoClient {
    commands: CommandHandler;
    events: ListenerHandler;
    locales: LocaleHandler;
    scheduler: TaskHandler;
    twitter: Twitter;
    streams: Stream[];
    logger: Logger;
    logs: CustomMongooseProvider;
    settings: {
      guilds: CustomMongooseProvider;
      channels: CustomMongooseProvider;
      users: CustomMongooseProvider;
      members: CustomMongooseProvider;
    };
    data: {
      almanax: CustomMongooseProvider;
    };
    invite: string | null;
  }
}
