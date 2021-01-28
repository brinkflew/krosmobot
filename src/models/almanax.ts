import { Schema, model } from 'mongoose';

const schema = new Schema(
  {
    id: { type: String, required: true, index: { unique: true, expires: '30d' } },
    url: { type: String, trim: true },
    title: { type: String, trim: true },
    offering: { type: String, trim: true },
    meryde: { type: String, trim: true },
    description: { type: String, trim: true },
    day: { type: String, trim: true },
    month: { type: String, trim: true },
    bonus: {
      title: { type: String, trim: true },
      description: { type: String, trim: true }
    },
    images: {
      meryde: { type: String, trim: true },
      item: { type: String, trim: true }
    }
  }, { minimize: false }
);

export const almanaxModel = model('almanax', schema);
