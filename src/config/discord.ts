import { ClientOptions } from 'discord.js';

const config: ClientOptions = {
  shards: 'auto',
  disableMentions: 'everyone',
  messageCacheMaxSize: 250,
  messageCacheLifetime: 60 * 60 * 2,
  messageSweepInterval: 60 * 5,
  messageEditHistoryMaxSize: 10,
  fetchAllMembers: false,
  presence: {
    status: 'online',
    afk: false
  }
};

export default config;
