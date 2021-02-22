import { AkairoModuleOptions } from 'discord-akairo';
import { Document } from 'mongoose';
import { AxiosResponse } from 'axios';
import { TextChannel } from 'discord.js';

export type LocaleString = string | ((...args: any[]) => string);

export interface LocaleOptions extends AkairoModuleOptions {
  language?: string;
}

export interface MongooseProviderDocument extends Document {
  [key: string]: any;
}

export interface DocumentSettings {
  prefix?: string;
  locale?: string;
  color?: string;
}

export interface AlmanaxDocument extends MongooseProviderDocument {
  url: string;
  title: string;
  offering: string;
  meryde: string;
  description: string;
  day: string;
  month: string;
  bonus: { title: string; description: string };
  images: { meryde: string; item: string };
}

export type DofusJob = 'alchemist' | 'jeweller' | 'handyman' | 'lumberjack' | 'hunter' | 'shoemagus' | 'shoemaker' | 'costumagus' | 'craftmagus' | 'artificer' | 'smithmagus' | 'smith' | 'jewelmagus' | 'miner' | 'farmer' | 'fisherman' | 'carvmagus' | 'carver' | 'tailor';

export interface MemberDocument extends MongooseProviderDocument {
  jobs: { [key in DofusJob]?: number };
}

export interface ReminderDocument extends MongooseProviderDocument {
  guild: string;
  author: string;
  channel: string;
  content: string;
  timestamp: number;
  locale: string;
}

export interface GuildDocument extends MongooseProviderDocument {
  dofus: { server: { id?: string; name?: string } };
  channels: { almanax?: string; news?: string };
  settings: DocumentSettings;
}

export type IssueDocumentType = 'bug' | 'feature' | 'unknown';
export type IssueDocumentStatus = 'pending' | 'cancel' | 'dev' | 'block' | 'test' | 'deploy';

export interface IssueDocument extends MongooseProviderDocument {
  messages: string[];
  channels: string[];
  guilds: string[];
  title: string;
  description: string;
  status: IssueDocumentStatus;
  type: IssueDocumentType;
  locale: string;
}

export interface LogDocument extends MongooseProviderDocument {
  level: string;
  message: string;
  timestamp: number;
}

export interface UserDocument extends MongooseProviderDocument {
  settings: DocumentSettings;
}

export interface PollDocument extends MongooseProviderDocument {
  guild: string;
  author: string;
  channel: string;
  title: string;
  propositions: string[];
  answers: string[][];
  timestamp: number;
  multi: boolean;
}

export interface SetCommandArguments {
  'channels.almanax'?: TextChannel;
  'channels.twitter'?: TextChannel;
  'dofus.server'?: string;
}

export interface GetCommandArguments {
  'channels.almanax': boolean;
  'channels.twitter': boolean;
  'dofus.server': boolean;
  'settings.prefix': boolean;
  'settings.color': boolean;
  'settings.locale': boolean;
}

export interface LoggerOptions {
  stdout?: NodeJS.WriteStream & { fd: 1 };
  stderr?: NodeJS.WriteStream & { fd: 2 };
  colors?: boolean;
  lineLength?: number;
}

export interface ScraperSchema {
  id: string;
  selector: string;
  attribute: 'text' | 'src' | string;
  transform?: (value: string) => string;
}

export interface ScraperPage {
  url: string;
  language: string;
  data?: { [key: string]: unknown }[];
  response?: AxiosResponse;
  fields: ScraperSchema[];
}

export interface TaskOptions extends AkairoModuleOptions {
  interval?: number;
  timestamp?: number;
  at?: string;
  enabled?: boolean;
}

export interface MetricOptions extends AkairoModuleOptions {
  type: 'value' | 'average' | 'frequency';
  unit?: string;
  interval?: number;
  default?: number;
}

export interface DofusTransport {
  x: number;
  y: number;
  zone: string;
  world: string;
  distance: number;
  type: string;
}
