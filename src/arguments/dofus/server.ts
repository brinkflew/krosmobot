import { Message } from 'discord.js';
import { Client, Scraper } from '@/structures';
import { URLS } from '@/constants';
import { servers } from '@/scraping-schemas';

export const dofusServer = async (message: Message, phrase: string) => {
  if (phrase.length) {

    const scraped = await Scraper.scrape({
      language: 'fr',
      url: URLS.DOFUS_PORTALS_SERVEURS,
      fields: servers
    });
    const server = scraped.data?.find(server => (<string> server.name).toLowerCase() === phrase);
    return server || null;
  }

  if (!message.guild) return null;
  const doc = (<Client> message.client).providers.guilds.fetch(message.guild.id);
  if (!doc?.dofus?.server?.id) return null;
  return doc.dofus.server;
};
