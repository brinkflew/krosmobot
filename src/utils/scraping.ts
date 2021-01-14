import { Scraper } from '@/structures';
import { servers } from '@/scraping-schemas';
import { DOFUS_PORTALS_URL } from '@/constants';

/**
 * Finds the ID of a Dofus server on https://www.dofus-portals.fr.
 * @param name Name of the server to find
 */
export async function findPortalServer(name: string): Promise<{ [key: string]: unknown } | null> {
  const url = `${DOFUS_PORTALS_URL}/serveurs`;
  const scraped = await Scraper.scrape({ language: 'fr', url, fields: servers });
  const server = scraped.data?.find(server => (<string> server.name).toLowerCase() === name);
  return server || null;
}
