const source = `https://raw.githubusercontent.com/brinkflew/krosmobot/${(<string> process.env.npm_package_version)}/static/pictures`;

/** Jobs icons */
export const jobs: { [key: string]: string } = {
  alchemist: `${source}/jobs/alchemist.png`,
  artificer: `${source}/jobs/artificer.png`,
  carver: `${source}/jobs/carver.png`,
  carvmagus: `${source}/jobs/carvmagus.png`,
  costumagus: `${source}/jobs/costumagus.png`,
  craftmagus: `${source}/jobs/craftmagus.png`,
  farmer: `${source}/jobs/farmer.png`,
  fisherman: `${source}/jobs/fisherman.png`,
  handyman: `${source}/jobs/handyman.png`,
  hunter: `${source}/jobs/hunter.png`,
  jeweller: `${source}/jobs/jeweller.png`,
  jewelmagus: `${source}/jobs/jewelmagus.png`,
  lumberjack: `${source}/jobs/lumberjack.png`,
  miner: `${source}/jobs/miner.png`,
  shoemagus: `${source}/jobs/shoemagus.png`,
  shoemaker: `${source}/jobs/shoemaker.png`,
  smith: `${source}/jobs/smith.png`,
  smithmagus: `${source}/jobs/smithmagus.png`,
  tailor: `${source}/jobs/tailor.png`
};

/** RSS feeds icons */
export const rss: { [key: string]: string } = {
  changelog: `${source}/rss/changelog.png`,
  devblog: `${source}/rss/devblog.png`,
  dofus: `${source}/rss/dofus.png`,
  news: `${source}/rss/news.png`
};

/** Twitter icons */
export const twitter: { [key: string]: string } = {
  twitter: `${source}/twitter/twitter.png`
};
