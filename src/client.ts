import 'module-alias/register';
import dotenv from 'dotenv';
import { Client, Logger } from '@/structures';
import mongoose from 'mongoose';

// Load environment variables from the `.env` file
dotenv.config();

// Import configuration
import akairoConfig from '@/config/akairo';
import discordConfig from '@/config/discord';
import mongooseConfig, { url } from '@/config/mongoose';

// Find the owners if set in the environment
const ownerID = process.env.KROSMOBOT_OWNERS?.split(',');

// Create the client
const client = new Client({ ownerID, ...akairoConfig }, discordConfig);
client.logger.info(Logger.format('process', 'running', { version: <string> process.env.npm_package_version }));

// Setup the connection to the database
client.logger.info(Logger.format('provider', 'connecting', { provider: 'MongoDB' }));
mongoose.connect(url, mongooseConfig)
  .then(() => client.logger.success(Logger.format(
    'process',
    'connected',
    {
      url: url.replace(/(:\/{2}).*@/, '$1'),
      database: mongoose.connection.db.databaseName,
      collections: mongoose.connection.modelNames().length
    }
  )))
  .catch(error => client.logger.error(error));

// Fire the client up
client.logger.info(Logger.format('discord', 'connecting'));
void client.connect(process.env.KROSMOBOT_TOKEN);
