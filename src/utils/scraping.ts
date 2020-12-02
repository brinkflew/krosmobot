import { Message } from 'discord.js';
import { Command, Scraper } from '@/structures';
import { servers } from '@/scraping-schemas';

/**
 * Finds the ID of a Dofus server on https://www.dofus-portals.fr.
 * @param command Command currently being executed
 * @param message Message that triggered the command
 * @param name Name of the server to find
 */
export async function findPortalServer(command: Command, message: Message, name: string): Promise<any> {
  const url = 'https://dofus-portals.fr/serveurs';
  const scraped = await Scraper.scrape({ language: 'fr', url, fields: servers });
  if (!scraped.data?.length) return command.error(message, 'COMMAND_SET_RESPONSE_SCRAPE_ERROR');
  const server = scraped.data.find(server => (<string>server.name).toLowerCase() === name);
  if (!server) return command.error(message, 'COMMAND_SET_RESPONSE_NOSERVER');
  return server;
}
