import { Schema, model } from 'mongoose';

const schema = new Schema(
  {
    id: { type: String, required: true, index: true },
    guild: { type: String },
    author: { type: String, required: true },
    channel: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Number, required: true },
    locale: { type: String, required: true }
  }, { minimize: false }
);

export const reminderModel = model('reminder', schema);
