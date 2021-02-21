import { Schema, model } from 'mongoose';

const schema = new Schema(
  {
    id: { type: String, required: true, index: { unique: true } },
    messages: { type: [String], required: true },
    channels: { type: [String], required: true },
    guilds: { type: [String], required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    type: { type: String, required: true },
    locale: { type: String, required: true }
  }, { minimize: false }
);

export const issueModel = model('issue', schema);
