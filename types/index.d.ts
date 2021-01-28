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

export interface DocumentSettings {
  prefix?: string;
  locale?: string;
  color?: string;
}

export interface GuildDocument extends MongooseProviderDocument {
  dofus: { server: { id?: string; name?: string } };
  channels: { almanax?: string; news?: string };
  settings: DocumentSettings;
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

export interface SetGetCommandArguments {
  'channels.almanax'?: TextChannel;
  'channels.twitter'?: TextChannel;
  'dofus.server'?: string;
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

export interface AlmanaxData {
  url: string;
  title: string;
  offering: string;
  meryde: string;
  description: string;
  'bonus.title'?: string;
  'bonus.description'?: string;
  bonus?: {
    title: string;
    description: string;
  };
  'images.meryde'?: string;
  'images.item'?: string;
  images?: {
    meryde: string;
    item: string;
  };
  month: string;
  day: string;
}

export interface TaskOptions extends AkairoModuleOptions {
  interval?: number;
  timestamp?: number;
  at?: string;
  enabled?: boolean;
}
