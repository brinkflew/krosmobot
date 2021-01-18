import { resolve, join } from 'path';

const sources = {
  github: `https://raw.githubusercontent.com/brinkflew/krosmobot/${(<string> process.env.npm_package_version)}/static/pictures`,
  canvas: [__dirname, '..', '..', 'static', 'pictures', 'canvas']
};

/** Jobs icons */
export const jobs: { [key: string]: string } = {
  alchemist: `${sources.github}/jobs/alchemist.png`,
  artificer: `${sources.github}/jobs/artificer.png`,
  carver: `${sources.github}/jobs/carver.png`,
  carvmagus: `${sources.github}/jobs/carvmagus.png`,
  costumagus: `${sources.github}/jobs/costumagus.png`,
  craftmagus: `${sources.github}/jobs/craftmagus.png`,
  farmer: `${sources.github}/jobs/farmer.png`,
  fisherman: `${sources.github}/jobs/fisherman.png`,
  handyman: `${sources.github}/jobs/handyman.png`,
  hunter: `${sources.github}/jobs/hunter.png`,
  jeweller: `${sources.github}/jobs/jeweller.png`,
  jewelmagus: `${sources.github}/jobs/jewelmagus.png`,
  lumberjack: `${sources.github}/jobs/lumberjack.png`,
  miner: `${sources.github}/jobs/miner.png`,
  shoemagus: `${sources.github}/jobs/shoemagus.png`,
  shoemaker: `${sources.github}/jobs/shoemaker.png`,
  smith: `${sources.github}/jobs/smith.png`,
  smithmagus: `${sources.github}/jobs/smithmagus.png`,
  tailor: `${sources.github}/jobs/tailor.png`
};

/** RSS feeds icons */
export const rss: { [key: string]: string } = {
  changelog: `${sources.github}/rss/changelog.png`,
  devblog: `${sources.github}/rss/devblog.png`,
  dofus: `${sources.github}/rss/dofus.png`,
  news: `${sources.github}/rss/news.png`
};

/** Twitter icons */
export const twitter: { [key: string]: string } = {
  twitter: `${sources.github}/twitter/twitter.png`
};

/* Canvas images */
export const canvas: { [key: string]: string } = {
  dice: resolve(join(...sources.canvas, 'dice.png'))
};
