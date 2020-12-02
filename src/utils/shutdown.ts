import mongoose from 'mongoose';
import { AkairoClient } from 'discord-akairo';

/**
 * Gracefully exit the current process.
 * @param client Client
 * @param code Exit code for the process
 */
export const shutdown = async (client: AkairoClient, code = 0) => {
  client.logger.warning('Gracefully exiting process...');

  // Remove all event listeners and clear the events loop
  client.logger.verbose('Removing event listeners...');
  process.removeAllListeners();
  client.logger.debug('Removed event listeners');

  // Set ext code
  client.logger.verbose(`Setting process exit code to '${code}'`);
  process.exitCode = code;

  // Destroy the Discord client
  client.logger.info('Disconnecting Discord client...');
  client.logger.debug('Destroying client...');
  client.destroy();
  client.logger.success('Client disconnected');

  // We're done, see you next time!
  client.logger.info(`Process exited with code ${code}`);

  // Remove providers and disconnect from database, though logs are now disabled
  if ([1, 2].includes(mongoose.connection.readyState)) await mongoose.disconnect();
};

