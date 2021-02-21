import dotenv from 'dotenv';
dotenv.config();

/* eslint-disable @typescript-eslint/naming-convention */

const {
  KROSMOBOT_PREFIX,
  KROSMOBOT_LOCALE,
  KROSMOBOT_USERNAME,
  KROSMOBOT_TASKS_INTERVAL,
  KROSMOBOT_SUPPORT_GUILD,
  KROSMOBOT_ISSUES_CHANNEL
} = process.env;

export const DEFAULTS = {
  PREFIX: KROSMOBOT_PREFIX || '!',
  LOCALE: KROSMOBOT_LOCALE || 'en',
  CLIENTNAME: KROSMOBOT_USERNAME || 'KrosmoBot',
  TASKS_INTERVAL: KROSMOBOT_TASKS_INTERVAL || 60,
  SUPPORT_GUILD: KROSMOBOT_SUPPORT_GUILD || '399609103137112078',
  ISSUES_CHANNEL: KROSMOBOT_ISSUES_CHANNEL || '811869512688599041'
};

/* eslint-enable @typescript-eslint/naming-convention */
