import { AkairoModuleOptions } from 'discord-akairo';
import { Document } from 'mongoose';
import { AxiosResponse } from 'axios';

export type LocaleString = string | ((...args: any[]) => string);

export interface LocaleOptions extends AkairoModuleOptions {
  language?: string;
}

export interface RivebotOptions extends AkairoModuleOptions {
  language?: string;
}

export interface MongooseProviderDocument extends Document {
  [key: string]: any;
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
