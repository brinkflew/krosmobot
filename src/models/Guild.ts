import { Schema, model } from 'mongoose';

const schema = new Schema(
  {
    id: { type: String, required: true, index: true },
    prefix: { type: String, maxlength: 10, minlength: 1 }
  }, { minimize: false }
);

export const GuildModel = model('guild', schema);
