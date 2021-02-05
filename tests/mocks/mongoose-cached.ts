import { Collection } from 'discord.js';
import { clone } from '../../src/utils';
import { Client } from '../../src/structures';
import { MongooseProviderDocument } from 'types';
import { Model } from 'mongoose';

export default class MockedMongooseCachedProvider {

  public model: Model<MongooseProviderDocument, Record<string, unknown>>;
  public cache: Collection<string, Record<string, unknown>>;
  public items: Collection<string, Record<string, unknown>>;
  public client: Client;

  public constructor(client: Client, model: Model<MongooseProviderDocument, Record<string, unknown>>) {
    this.client = client;
    this.model = model;
    this.cache = new Collection();
    this.items = this.cache;
  }

  public async init(): Promise<void> {
    // Do nothing
  }

  public get(id: string) {
    return this.cache.get(id);
  }

  public fetch(id: string) {
    return this.get(id);
  }

  public create(id: string, record: Record<string, unknown>): Record<string, unknown> {
    const cached = this.get(id);
    if (cached) return this.update(id, record);
    record.id = id;
    this.cache.set(id, record);
    return record;
  }

  public update(id: string, record: Record<string, unknown>): Record<string, unknown> {
    const cached = this.get(id) as any;
    if (!cached) return this.create(id, record);

    for (const [key, value] of Object.entries(record)) {
      cached[key] = typeof cached[key] === 'object' && !Array.isArray(cached[key]) && typeof value === 'object' && !Array.isArray(value)
        ? { ...cached[key], ...value }
        : clone(value);
    }

    cached.id = cached.id || id;
    this.cache.set(id, cached);
    return cached;
  }

  public set() {
    throw new Error('Not implemented');
  }

  public delete(id: string) {
    return this.cache.delete(id);
  }

  public clear(id: string) {
    return this.delete(id);
  }

}
