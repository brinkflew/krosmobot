import { Schema, model } from 'mongoose';

const schema = new Schema(
  {
    id: { type: String, required: true, index: true }
  }, { minimize: false }
);

export const channelModel = model('channel', schema);
