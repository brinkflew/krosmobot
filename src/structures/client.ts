import {
  AkairoClient,
  AkairoOptions
} from 'discord-akairo';
import { ClientOptions } from 'discord.js';

export default class Client extends AkairoClient {
  constructor(akairoOptions: AkairoOptions, discordOptions: ClientOptions) {
    super(akairoOptions, discordOptions);
  }


}
