import { Provider } from 'discord-akairo';
import { Model, Document } from 'mongoose';
import metrics from '@/metrics';
import { clone } from '@/utils';

// Typings
import { MongooseProviderDocument } from 'types';

/**
* Custom provider using the mongoose library.
* @param model Model to register with this provider
*/
export default class MongooseProvider extends Provider {

  public model: Model<MongooseProviderDocument, Record<string, unknown>>;

  public constructor(model: Model<Document, Record<string, unknown>>) {
    super();
    this.model = model;
  }

  /**
   * Initializes the provider.
   */
  public async init(): Promise<void> {
    const records = await this.model.find();
    metrics.mongodb.requests.mark();

    for (const record of records) {
      this.items.set(record.id, record);
      metrics.mongodb.cache.mark();
    }
  }

  /**
   * Gets a value.
   * @param id ID of the guild
   * @param key The key to get
   * @param [defaultValue] Default value if not found
   */
  public get(id: string, key: string, defaultValue?: any): any {
    if (this.items.has(id)) {
      const value = this.items.get(id)[key];
      metrics.mongodb.cache.mark();
      return value === null || value === undefined ? defaultValue : value;
    }

    return defaultValue;
  }

  /**
   * Sets a value.
   * @param id ID of the guild
   * @param key The key to set
   * @param value The value to set
   * @param merge Whether to merge the values into the existing ones or overwrite them
   */
  public async set(id: string, key: string | string[], value: any | any[], merge = true): Promise<MongooseProviderDocument> {
    if (!Array.isArray(key)) key = [key];
    if (!Array.isArray(value)) value = [value];
    if (key.length !== value.length) throw new TypeError('Different number of keys and values');

    const data = this.items.get(id) || {};
    metrics.mongodb.cache.mark();
    const doc = await this.find(id);

    for (const [index, k] of key.entries()) {
      let newValue = value[index];

      if (merge && typeof data[k] === 'object' && typeof value[index] === 'object') {
        newValue = { ...data[k], ...value[index] };
      }

      data[k] = clone(newValue);
      doc[k] = clone(newValue);
      doc.markModified(k);
    }

    this.items.set(id, data);
    metrics.mongodb.cache.mark();
    return this.save(doc);
  }

  /**
   * Deletes a value.
   * @param id ID of the guild
   * @param key The key to delete
   */
  public async delete(id: string, key: string): Promise<MongooseProviderDocument> {
    const data = this.items.get(id) || {};
    metrics.mongodb.cache.mark();
    delete data[key];

    const doc = await this.find(id);
    delete doc[key];
    doc.markModified(key);
    return this.save(doc);
  }

  /**
   * Removes a document.
   * @param id ID of the guild
   */
  public async clear(id: string): Promise<void> {
    this.items.delete(id);
    metrics.mongodb.cache.mark();
    const doc = await this.find(id);
    if (doc) await this.remove(doc);
  }

  /**
   * Finds a document by its ID.
   * @param id ID of the guild
   */
  private async find(id: string): Promise<MongooseProviderDocument> {
    const found = await this.model.findOne({ id });
    metrics.mongodb.requests.mark();

    if (!found) {
      // eslint-disable-next-line new-cap
      const created = new this.model({ id });
      metrics.mongodb.requests.mark();
      return created;
    }

    return found;
  }

  /**
   * Saves a document to the database and update the relevant metrics.
   * @param doc Document to save
   */
  private async save(doc: MongooseProviderDocument): Promise<MongooseProviderDocument> {
    const saved = doc.save();
    metrics.mongodb.requests.mark();
    return saved;
  }

  /**
   * Removes a document from the database and update the relevant metrics.
   * @param doc Document to remove
   */
  private async remove(doc: MongooseProviderDocument): Promise<MongooseProviderDocument> {
    const removed = doc.remove();
    metrics.mongodb.requests.mark();
    return removed;
  }

}
