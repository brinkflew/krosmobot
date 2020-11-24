import { Schema, model } from 'mongoose';

const schema = new Schema(
  {
    id: { type: String, required: true, index: true },
    prefix: { type: String, minlength: 1, maxlength: 10 },
    locale: { type: String, minlength: 2, maxlength: 2 }
  }, { minimize: false }
);

export const GuildModel = model('guild', schema);
