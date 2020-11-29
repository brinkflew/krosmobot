import { AkairoModuleOptions } from 'discord-akairo';
import { Document } from 'mongoose';
import { AxiosResponse } from 'axios';

type LocaleString = string | ((...args: any[]) => string);

interface LocaleOptions extends AkairoModuleOptions {
  language?: string;
}

interface MongooseProviderDocument extends Document {
  [key: string]: any;
}

interface LoggerOptions {
  stdout?: NodeJS.WriteStream & { fd: 1 };
  stderr?: NodeJS.WriteStream & { fd: 2 };
  colors?: boolean;
  lineLength?: number;
}

interface ScraperSchema {
  id: string;
  selector: string;
  attribute: 'text' | 'src' | string;
  transform?: (value: string) => string;
}

interface ScraperPage {
  url: string;
  language: string;
  data?: { [key: string]: any };
  response?: AxiosResponse;
  fields: ScraperSchema[];
}

declare class AlmanaxData {
  url: string;
  title: string;
  offering: string;
  meryde: string;
  description: string;
  'bonus.title': string;
  'bonus.description': string;
  'images.meryde': string;
  'images.item': string;
  month: string;
  day: string;
}
