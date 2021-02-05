import 'module-alias/register';
import dotenv from 'dotenv';
import { Client } from '../../src/structures';

// Load environment variables from the `.env` file
dotenv.config({ path: '.env.test' });

// Import configuration
import akairoConfig from '../config/akairo';
import discordConfig from '../config/discord';

// Find the owners if set in the environment
const ownerID = process.env.KROSMOBOT_OWNERS?.split(',');

// Create the client
const cl = new Client({ ownerID, ...akairoConfig }, discordConfig);

// Force specific options for tests
cl.commands.defaultCooldown = 0;
cl.commands.commandUtil = false;

/**
 * Exports the client instance.
 */
export const client = cl;

/**
 * Cleans and destroys the client.
 */
export const destroy = () => {
  client.crons.forEach(cron => clearInterval(cron));
  client.destroy();
};
