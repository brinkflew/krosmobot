import { ClientOptions } from 'discord.js';

const config: ClientOptions = {
  shards: 'auto',
  disableMentions: 'everyone',
  messageCacheMaxSize: 50,
  messageCacheLifetime: 60 * 60,
  messageSweepInterval: 60 * 5,
  messageEditHistoryMaxSize: 10,
  fetchAllMembers: false,
  presence: {
    status: 'dnd',
    afk: false
  }
};

export default config;
