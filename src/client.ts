import 'module-alias/register';
import dotenv from 'dotenv';
import { Client } from '@/structures';
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
client.logger.info(`Version ${(<string>process.env.npm_package_version)}`);

// Setup the connection to the database
client.logger.info('Connecting to providers...');
mongoose.connect(url, mongooseConfig)
  .then(() => client.logger.success(`Connected to database at '${url.replace(/(:\/{2}).*@/, '$1')}'`))
  .catch(error => client.logger.error(error));

// Fire the client up
client.logger.info('Connecting to the Discord gateway...');
void client.connect(process.env.KROSMOBOT_TOKEN);
