import { AkairoClient } from 'discord-akairo';
import CustomMongooseCachedProvider from '@/providers/mongoose-cached';
import { Locale } from '@/structures';
import {
  GuildDocument,
  UserDocument,
  DocumentSettings
} from 'types';

declare module 'discord.js' {
  export interface Message {
    client: AkairoClient;
    provider: CustomMongooseCachedProvider<GuildDocument> | CustomMongooseCachedProvider<UserDocument>;
    document: GuildDocument | UserDocument | undefined;
    settings: DocumentSettings | undefined;
    locale: Locale;
    translate(key: string, ...args: any[]): string;
    t(key: string, ...args: any[]): string;
  }
}
