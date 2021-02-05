import Twitter from 'twitter-lite-v2';
import { LocaleHandler, TaskHandler, MetricHandler } from '@/handlers';
import { Logger } from '@/structures';
import CustomMongooseCachedProvider from '@/providers/mongoose-cached';
import CustomMongooseProvider from '@/providers/mongoose';

declare module 'discord-akairo' {
  export interface AkairoClient {
    crons: Set<NodeJS.Timeout>;
    commands: CommandHandler;
    events: ListenerHandler;
    locales: LocaleHandler;
    scheduler: TaskHandler;
    metrics: MetricHandler;
    twitter: Twitter;
    logger: Logger;
    providers: {
      logs: CustomMongooseProvider;
      almanax: CustomMongooseCachedProvider;
      guilds: CustomMongooseCachedProvider;
      members: CustomMongooseCachedProvider;
      polls: CustomMongooseCachedProvider;
      reminders: CustomMongooseCachedProvider;
      users: CustomMongooseCachedProvider;
    };
    invite: string | null;
    userCount: number;
  }
}
