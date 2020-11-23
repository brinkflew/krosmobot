import 'module-alias/register';
import dotenv from 'dotenv';
import { Client } from '@/structures';

// Import configuration
import akairoConfig from '@/config/akairo';
import discordConfig from '@/config/discord';

// Load environment variables from the `.env` file
dotenv.config();

// Find the owners if set in the environment
const ownerID = process.env.KROSMOBOT_OWNERS?.split(',') || undefined;

// Fire the client up
new Client({ ownerID, ...akairoConfig }, discordConfig)
  .init()
  .login(process.env.KROSMOBOT_TOKEN);
