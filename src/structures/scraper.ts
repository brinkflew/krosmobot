import axios, { AxiosResponse } from 'axios';
import { load } from 'cheerio';
import { ScraperPage } from 'types';

/**
 * Scrapes a webpage for information.
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Scraper {

  /**
   * Scrapes a webpage to extract its data based on a defoined schema.
   * @param page Page object from which content needs to be fetched
   * @param fields Schema of the scraping to do on this page
   */
  public static async scrape(page: ScraperPage): Promise<ScraperPage> {
    const response = await this.request(page.url);
    const $ = load(response.data);
    const data = page.data || [];

    for (const field of page.fields) {
      const nodes = $(field.selector);

      nodes.each((index, node) => {
        const element = $(node); // .first();
        let value = field.attribute === 'text'
          ? element.text()
          : element.attr(field.attribute);

        if (!value) return null;
        value = value.trim();
        value = field.transform ? field.transform(value) : value;
        if (typeof value === 'string') value = value.trim();
        if (!data[index]) data[index] = {};
        return data[index][field.id] = value;
      });
    }

    page.data = data;
    return page;
  }

  /**
   * Fetch the content of a webpage from the world wide web.
   * @param url URL of the page to download
   */
  private static async request(url: string): Promise<AxiosResponse> {
    return axios.request({
      url,
      method: 'get',
      responseType: 'text',
      validateStatus: status => {
        if ((status >= 200 && status < 300)) return true;
        return false;
      }
    });
  }

}
