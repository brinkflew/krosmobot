import mongoose from 'mongoose';
import { AkairoClient } from 'discord-akairo';
import { Logger } from '@/structures';

/**
 * Gracefully exit the current process.
 * @param client Client
 * @param code Exit code for the process
 */
export const shutdown = async (client: AkairoClient, code = 0) => {
  client.logger.warning(Logger.format('process', 'shutdown'));

  // Remove all event listeners and clear the events loop
  process.removeAllListeners();
  client.logger.debug(Logger.format('process', 'listeners-removed'));

  // Remove intervals and timeouts
  client.crons.forEach(cron => clearInterval(cron));

  // Set exit code
  process.exitCode = code;

  // Destroy the Discord client
  client.logger.info(Logger.format('discord', 'disconnecting'));
  client.destroy();
  client.logger.success(Logger.format('discord', 'disconnected'));

  // We're done, see you next time!
  client.logger.info(Logger.format('process', 'exited', { code }));

  // Remove providers and disconnect from database, though logs are now disabled
  if ([1, 2].includes(mongoose.connection.readyState)) await mongoose.disconnect();
};

