import Twitter from 'twitter-lite-v2';
import { LocaleHandler, TaskHandler, MetricHandler } from '@/handlers';
import { Logger } from '@/structures';
import CustomMongooseCachedProvider from '@/providers/mongoose-cached';
import CustomMongooseProvider from '@/providers/mongoose';
import {
  AlmanaxDocument,
  GuildDocument,
  LogDocument,
  MemberDocument,
  PollDocument,
  ReminderDocument,
  UserDocument
} from 'types';

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
      almanax: CustomMongooseCachedProvider<AlmanaxDocument>;
      guilds: CustomMongooseCachedProvider<GuildDocument>;
      logs: CustomMongooseProvider<LogDocument>;
      members: CustomMongooseCachedProvider<MemberDocument>;
      polls: CustomMongooseCachedProvider<PollDocument>;
      reminders: CustomMongooseCachedProvider<ReminderDocument>;
      users: CustomMongooseCachedProvider<UserDocument>;
    };
    invite: string | null;
    userCount: number;
  }
}
