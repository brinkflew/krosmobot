import Twitter from 'twitter-lite-v2';
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
    logger: Logger;
    logs: CustomMongooseProvider;
    providers: {
      almanax: CustomMongooseProvider;
      guilds: CustomMongooseProvider;
      members: CustomMongooseProvider;
      polls: CustomMongooseProvider;
      reminders: CustomMongooseProvider;
      users: CustomMongooseProvider;
    };
    invite: string | null;
    userCount: number;
  }
}
