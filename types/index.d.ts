import { AkairoModuleOptions } from 'discord-akairo';
import { TextChannel } from 'discord.js';
import { Document } from 'mongoose';
import { AxiosResponse } from 'axios';

export type LocaleString = string | ((...args: any[]) => string);

export interface LocaleOptions extends AkairoModuleOptions {
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
  'bonus.title': string;
  'bonus.description': string;
  'images.meryde': string;
  'images.item': string;
  month: string;
  day: string;
}

export interface TaskOptions extends AkairoModuleOptions {
  interval?: number;
  timestamp?: number;
  at?: string;
  enabled?: boolean;
}

export interface SetCommandArguments {
  almanaxAuto: string;
  almanaxChannel: TextChannel;
  dofusServer: string;
  newsChannel: TextChannel;
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface TwitterResponse {
  data: {
    search_metadata: {
      completed_in: number;
      max_id: number;
      max_id_str: string;
      next_results: string;
      query: string;
      refresh_url: string;
      count: number;
      since_id: number;
      since_id_str: string;
    };
    statuses: [
      {
        created_at: string;
        id: number;
        id_str: string;
        text: string;
        full_text: string;
        truncated: boolean;
        entities: Record<string, unknown>;
        metadata: Record<string, unknown>;
        source: string;
        in_reply_to_status_id: number;
        in_reply_to_status_id_str: string;
        in_reply_to_user_id: number;
        in_reply_to_user_id_str: string;
        in_reply_to_screen_name: string;
        user: unknown;
      }
    ];
  };
}
