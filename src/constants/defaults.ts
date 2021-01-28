/* eslint-disable @typescript-eslint/naming-convention */

const {
  KROSMOBOT_PREFIX,
  KROSMOBOT_LOCALE,
  KROSMOBOT_USERNAME,
  KROSMOBOT_TASKS_INTERVAL
} = process.env;

export const DEFAULTS = {
  PREFIX: KROSMOBOT_PREFIX || '!',
  LOCALE: KROSMOBOT_LOCALE || 'en',
  CLIENTNAME: KROSMOBOT_USERNAME || 'KrosmoBot',
  TASKS_INTERVAL: KROSMOBOT_TASKS_INTERVAL || 60
};

/* eslint-enable @typescript-eslint/naming-convention */
