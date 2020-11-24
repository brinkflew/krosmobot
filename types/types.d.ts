import { AkairoModuleOptions } from 'discord-akairo';
import { Document } from 'mongoose';

type LocaleString = string | ((...args: any[]) => string);

interface LocaleOptions extends AkairoModuleOptions {
  language?: string;
}

interface MongooseProviderDocument extends Document {
  [key: string]: any;
}
