import { Provider } from 'discord-akairo';
import { Model } from 'mongoose';
import { Client } from '@/structures';
import { clone } from '@/utils';

// Typings
import { MongooseProviderDocument } from 'types';

/**
* Custom provider using the mongoose library.
* @param client Client the provider is attached to
* @param model Model to register with this provider
*/
export default class MongooseProvider extends Provider {

  public model: Model<MongooseProviderDocument, Record<string, unknown>>;
  public client: Client;

  public constructor(client: Client, model: Model<MongooseProviderDocument, Record<string, unknown>>) {
    super();
    this.client = client;
    this.model = model;
  }

  /**
   * Initializes the provider.
   * Does nothing as there is no cache to fill-in.
   * This method is only define to content the abstract definition
   * of the provider.
   */
  public init(): void {
    void 0;
  }

  /**
   * Gets a record from the database.
   * @param id ID of the record
   */
  public async get(id: string): Promise<MongooseProviderDocument | undefined> {
    const value = await this.model.findOne({ id });
    this.client.metrics.update('provider.db.read.frequency');
    if (!value) return;
    return value;
  }

  /**
   * Gets a record from the database.
   * @param id ID of the record
   */
  public fetch(id: string): Promise<MongooseProviderDocument | undefined> {
    return this.get(id);
  }

  /**
   * Creates a new record in the database.
   * If the record already exists, updates it.
   * @param id ID of the record to insert
   * @param record Data to save to the database
   */
  public async create(id: string, record: Record<string, unknown>): Promise<MongooseProviderDocument> {
    const existing = await this.get(id);
    if (existing) return this.update(id, record);

    record.id = id;
    const doc = await new this.model(record).save();
    this.client.metrics.update('provider.db.write.frequency');
    return doc;
  }

  /**
   * Updates an existing record. If the record does not exists, creates it.
   * @param id ID of the record to update
   * @param record Data to save to the database
   */
  public async update(id: string, record: Record<string, unknown>): Promise<MongooseProviderDocument> {
    const existing = await this.get(id);
    if (!existing) return this.create(id, record);

    for (const [key, value] of Object.entries(record)) {
      existing[key] = typeof existing[key] === 'object' && !Array.isArray(existing[key]) && typeof value === 'object' && !Array.isArray(value)
        ? { ...existing[key], ...value }
        : clone(value);
      existing.markModified(key);
    }

    existing.id = existing.id || id;
    const saved = await existing.save(record);
    this.client.metrics.update('provider.db.write.frequency');
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
