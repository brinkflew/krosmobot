import axios, { AxiosResponse } from 'axios';
import { load } from 'cheerio';
import { ScraperPage } from 'types/types';

/**
 * Scrapes a webpage for information.
 */
export class Scraper {

  /**
   * Fetch the content of a webpage from the world wide web.
   * @param url URL of the page to download
   */
  private static async request(url: string): Promise<AxiosResponse> {
   return await axios.request({
      url: url,
      method: 'get',
      responseType: 'text',
      validateStatus: (status) => {
        if ((status >= 200 && status < 300)) return true;
        return false;
      }
    });
  }

  /**
   * Scrapes a webpage to extract its data based on a defoined schema.
   * @param page Page object from which content needs to be fetched
   * @param fields Schema of the scraping to do on this page
   */
  public static async scrape(page: ScraperPage): Promise<ScraperPage> {
    try {
      const response = await this.request(page.url);
      const $ = load(response.data);
      const data = page.data || {};

      for (const field of page.fields) {
        const nodes = $(field.selector);

        nodes.each((_index, node) => {
          const element = $(node).first();
          let value = field.attribute === 'text'
            ? element.text()
            : element.attr(field.attribute);

          if (!value) return null;
          value = value.trim();
          value = field.transform ? field.transform(value) : value;
          if (typeof value === 'string') value = value.trim();
          return data[field.id] = value;
        });
      }

      page.data = data;
      return page;
    } catch (error) {
      throw error;
    }
  }
}
