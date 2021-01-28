import { resolve, join } from 'path';

const sources = {
  github: `https://raw.githubusercontent.com/brinkflew/krosmobot/stable/static/pictures`,
  canvas: [__dirname, '..', '..', 'static', 'pictures', 'canvas']
};

/* eslint-disable @typescript-eslint/naming-convention */

/** Jobs icons */
export const DOFUS_JOBS: { [key: string]: string } = {
  ALCHEMIST: `${sources.github}/jobs/alchemist.png`,
  ARTIFICER: `${sources.github}/jobs/artificer.png`,
  CARVER: `${sources.github}/jobs/carver.png`,
  CARVMAGUS: `${sources.github}/jobs/carvmagus.png`,
  COSTUMAGUS: `${sources.github}/jobs/costumagus.png`,
  CRAFTMAGUS: `${sources.github}/jobs/craftmagus.png`,
  FARMER: `${sources.github}/jobs/farmer.png`,
  FISHERMAN: `${sources.github}/jobs/fisherman.png`,
  HANDYMAN: `${sources.github}/jobs/handyman.png`,
  HUNTER: `${sources.github}/jobs/hunter.png`,
  JEWELLER: `${sources.github}/jobs/jeweller.png`,
  JEWELMAGUS: `${sources.github}/jobs/jewelmagus.png`,
  LUMBERJACK: `${sources.github}/jobs/lumberjack.png`,
  MINER: `${sources.github}/jobs/miner.png`,
  SHOEMAGUS: `${sources.github}/jobs/shoemagus.png`,
  SHOEMAKER: `${sources.github}/jobs/shoemaker.png`,
  SMITH: `${sources.github}/jobs/smith.png`,
  SMITHMAGUS: `${sources.github}/jobs/smithmagus.png`,
  TAILOR: `${sources.github}/jobs/tailor.png`
};

/** Twitter icons */
export const TWITTER: { [key: string]: string } = {
  ICON: `${sources.github}/twitter/twitter.png`
};

/* Canvas images */
export const CANVAS: { [key: string]: string } = {
  DICE: resolve(join(...sources.canvas, 'dice.png'))
};

/* eslint-enable @typescript-eslint/naming-convention */
