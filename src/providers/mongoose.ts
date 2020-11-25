import { Provider } from 'discord-akairo';
import { Model, Document } from 'mongoose';

// Typings
import { MongooseProviderDocument } from 'types/types';

/**
* Custom provider using the mongoose library.
* @param model Model to register with this provider
*/
export default class MongooseProvider extends Provider {
  public model: Model<MongooseProviderDocument, {}>;
  
  constructor(model: Model<Document, {}>) {
    super();
    this.model = model;
  }
  
  /**
   * Initializes the provider.
   */
  async init(): Promise<void> {
    const guilds = await this.model.find();
    for (const i in guilds) {
      const guild = guilds[i];
      this.items.set(guild.id, guild);
    }
  }
  
  /**
   * Gets a value.
   * @param id ID of the guild
   * @param key The key to get
   * @param [defaultValue] Default value if not found
   */
  get(id: string, key: string, defaultValue?: any): any {
    if (this.items.has(id)) {
      const value = this.items.get(id)[key];
      return value === null || value === undefined ? defaultValue : value;
    }
    
    return defaultValue;
  }
  
  /**
   * Sets a value.
   * @param id ID of the guild
   * @param key The key to set
   * @param value The value to set
   */
  async set(id: string, key: string | string[], value: any | any[]) {
    if (!Array.isArray(key)) key = [key];
    if (!Array.isArray(value)) value = [value];
    if (key.length !== value.length) throw new TypeError('Different number of keys and values');

    const data = this.items.get(id) || {};
    const doc = await this.getDocument(id);
  
    for (const [index, k] of key.entries()) {
      data[k] = value[index];
      doc[k] = value[index];
      doc.markModified(k);
    }

    this.items.set(id, data);
    return doc.save();
  }
  
  /**
   * Deletes a value.
   * @param id ID of the guild
   * @param key The key to delete
   */
  async delete(id: string, key: string): Promise<any> {
    const data = this.items.get(id) || {};
    delete data[key];
    
    const doc = await this.getDocument(id);
    delete doc[key];
    doc.markModified(key);
    return doc.save();
  }
  
  /**
   * Removes a document.
   * @param id ID of the guild
   */
  async clear(id: string): Promise<void> {
    this.items.delete(id);
    const doc = await this.getDocument(id);
    if (doc) await doc.remove();
  }
  
  /**
   * Finds a document by its ID.
   * @param id ID of the guild
   */
  async getDocument(id: string): Promise<MongooseProviderDocument> {
    const obj = await this.model.findOne({ id });
    if (!obj) {
      // eslint-disable-next-line new-cap
      const newDoc = await new this.model({ id });
      return newDoc;
    }
    
    return obj;
  }
}
