import { metric, meter, counter, histogram } from '@pm2/io';
import { MetricMeasurements } from '@pm2/io/build/main/services/metrics';

export const shards = counter({
  name: 'Active Shards',
  id: 'discord.shards'
});

export const heartbeat = histogram({
  name: 'Discord Gateway Latency',
  id: 'discord.heartbeat',
  unit: 'ms',
  measurement: MetricMeasurements.mean
});

export const guilds = metric({
  name: 'Active Discord Guilds',
  id: 'discord.guilds'
});

export const channels = metric({
  name: 'Active Discord Channels',
  id: 'discord.channels'
});

export const users = metric({
  name: 'Active Discord Users',
  id: 'discord.users'
});

export const messages = meter({
  name: 'Messages Reception',
  id: 'discord.message.frequency',
  unit: '/s'
});

export const commands = meter({
  name: 'Commands Executed',
  id: 'discord.commands.frequency',
  unit: '/s'
});

export const commandsQueue = counter({
  name: 'Commands Queued',
  id: 'discord.commands.queue'
});
