import { Provider } from 'discord-akairo';
import { Collection } from 'discord.js';
import { Model } from 'mongoose';
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
  public cache: Collection<string, MongooseProviderDocument>;

  public constructor(model: Model<MongooseProviderDocument, Record<string, unknown>>) {
    super();
    this.model = model;
    this.cache = new Collection();
    this.items = this.cache;
  }

  /**
   * Initializes the provider.
   * Fetches records from the database and caches them.
   */
  public async init(): Promise<void> {
    const records = await this.model.find();
    metrics.mongodb.requests.mark();

    for (const record of records) {
      this.cache.set(record.id, record);
      metrics.mongodb.cache.mark();
    }
  }

  /**
   * Gets a record from the cache.
   * @param id ID of the record
   */
  public get(id: string): MongooseProviderDocument | undefined {
    const value = this.cache.get(id);
    metrics.mongodb.cache.mark();
    if (!value) return;
    return value;
  }

  /**
   * Gets a record from the cache.
   * @param id ID of the record
   */
  public fetch(id: string): MongooseProviderDocument | undefined {
    return this.get(id);
  }

  /**
   * Creates a new record on the database and saves it to the cache.
   * If the record already exists, updates it.
   * @param id ID of the record to insert
   * @param record Data to save to the database
   */
  public async create(id: string, record: Record<string, unknown>): Promise<MongooseProviderDocument> {
    const cached = this.cache.get(id);
    metrics.mongodb.cache.mark();
    if (cached) return this.update(id, record);

    record.id = id;
    const doc = await new this.model(record).save();
    metrics.mongodb.requests.mark();
    metrics.mongodb.cache.mark();
    this.cache.set(id, doc);
    return doc;
  }

  /**
   * Updates an existing record. If the record does not exists, creates it.
   * @param id ID of the record to update
   * @param record Data to save to the database
   */
  public async update(id: string, record: Record<string, unknown>): Promise<MongooseProviderDocument> {
    const cached = this.cache.get(id);
    metrics.mongodb.cache.mark();
    if (!cached) return this.create(id, record);

    for (const [key, value] of Object.entries(record)) {
      cached[key] = typeof cached[key] === 'object' && !Array.isArray(cached[key]) && typeof value === 'object' && !Array.isArray(value)
        ? { ...cached[key], ...value }
        : clone(value);
      cached.markModified(key);
    }

    cached.id = cached.id || id;
    const saved = await cached.save(record);
    metrics.mongodb.requests.mark();
    metrics.mongodb.cache.mark();
    this.cache.set(id, saved);
    return saved;
  }

  /**
   * Not implemented.
   * @deprecated
   */
  public set(): never {
    throw new Error('Not implemented');
  }

  /**
   * Deletes a record from the database.
   * @param id ID of the record
   */
  public async delete(id: string): Promise<void> {
    this.cache.delete(id);
    metrics.mongodb.cache.mark();
    metrics.mongodb.requests.mark();
    await this.model.deleteOne({ id });
  }

  /**
   * Deletes a record from the database.
   * @param id ID of the record
   */
  public async clear(id: string): Promise<void> {
    return this.delete(id);
  }

}
