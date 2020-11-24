import { Document } from 'mongoose';

interface MongooseProviderDocument extends Document {
  [key: string]: any;
}
