import { Provider } from 'discord-akairo';
import { Collection } from 'discord.js';
import { Model } from 'mongoose';
import { Client } from '@/structures';
import { clone } from '@/utils';

// Typings
import { MongooseProviderDocument } from 'types';

/**
* Custom provider using the mongoose library, making use of an in-memory cache.
* @param client Client the provider is attached to
* @param model Model to register with this provider
*/
export default class MongooseCachedProvider<D extends MongooseProviderDocument> extends Provider {

  public model: Model<MongooseProviderDocument, Record<string, unknown>>;
  public cache: Collection<string, D>;
  public client: Client;

  public constructor(client: Client, model: Model<D, Record<string, unknown>>) {
    super();
    this.client = client;
    this.model = model;
    this.cache = new Collection();
    this.items = this.cache;
  }

  /**
   * Initializes the provider.
   * Fetches records from the database and caches them.
   */
  public async init(): Promise<void> {
    const records = await this.model.find() as D[];
    this.client.metrics.update('provider.db.read.frequency');

    for (const record of records) {
      this.cache.set(record.id, record);
      this.client.metrics.update('provider.cache.write.frequency');
    }
  }

  /**
   * Gets a record from the cache.
   * @param id ID of the record
   */
  public get(id: string): D | undefined {
    const value = this.cache.get(id);
    this.client.metrics.update('provider.cache.read.frequency');
    if (!value) return;
    return value;
  }

  /**
   * Gets a record from the cache.
   * @param id ID of the record
   */
  public fetch(id: string): D | undefined {
    return this.get(id);
  }

  /**
   * Fetches all documents that satisfy the predicate.
   * @param predicate Filtering method to apply to the collection
   */
  public filter(predicate: (value: D, index: number, array: D[]) => boolean) {
    return this.cache.array().filter(predicate);
  }

  /**
   * Find the first document that satisfies the predicate.
   * @param predicate Filtering method to apply to the collection
   */
  public find(predicate: (value: D, index: number, array: D[]) => boolean) {
    return this.cache.array().find(predicate);
  }

  /**
   * Creates a new record in the database and saves it to the cache.
   * If the record already exists, updates it.
   * @param id ID of the record to insert
   * @param record Data to save to the database
   */
  public async create(id: string, record: Record<string, unknown>): Promise<D> {
    const cached = this.get(id);
    if (cached) return this.update(id, record);

    record.id = id;
    const doc = await new this.model(record).save() as D;
    this.client.metrics.update('provider.db.write.frequency');
    this.cache.set(id, doc);
    this.client.metrics.update('provider.cache.write.frequency');
    return doc;
  }

  /**
   * Updates an existing record. If the record does not exists, creates it.
   * @param id ID of the record to update
   * @param record Data to save to the database
   */
  public async update(id: string, record: Record<string, unknown>): Promise<D> {
    const cached = this.get(id) as MongooseProviderDocument;
    if (!cached) return this.create(id, record);

    for (const [key, value] of Object.entries(record)) {
      cached[key] = typeof cached[key] === 'object' && !Array.isArray(cached[key]) && typeof value === 'object' && !Array.isArray(value)
        ? { ...cached[key], ...value }
        : clone(value);
      cached.markModified(key);
    }

    cached.id = cached.id || id;
    const saved = await cached.save(record) as D;
    this.client.metrics.update('provider.db.write.frequency');
    this.cache.set(id, saved);
    this.client.metrics.update('provider.cache.write.frequency');
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
    this.client.metrics.update('provider.cache.write.frequency');
    await this.model.deleteOne({ id });
    this.client.metrics.update('provider.db.write.frequency');
  }

  /**
   * Deletes a record from the database.
   * @param id ID of the record
   */
  public async clear(id: string): Promise<void> {
    return this.delete(id);
  }

}
