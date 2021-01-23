import { metric, meter, counter } from '@pm2/io';

export const shards = counter({
  name: 'Active Shards',
  id: 'discord.shards'
});

export const heartbeat = metric({
  name: 'Discord Gateway Latency',
  id: 'discord.heartbeat',
  unit: 'ms'
});

export const guilds = metric({
  name: 'Active Guilds',
  id: 'discord.guilds'
});

export const channels = metric({
  name: 'Active Channels',
  id: 'discord.channels'
});

export const users = metric({
  name: 'Active Users',
  id: 'discord.users'
});

export const messages = meter({
  name: 'Messages Received',
  id: 'discord.message.frequency',
  unit: '/s'
});

export const commands = meter({
  name: 'Commands Completed',
  id: 'discord.commands.frequency',
  unit: '/s'
});

export const commandsQueue = counter({
  name: 'Commands Queued',
  id: 'discord.commands.queue'
});
