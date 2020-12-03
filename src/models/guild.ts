import { Schema, model } from 'mongoose';

const schema = new Schema(
  {
    id: { type: String, required: true, index: true },
    prefix: { type: String, minlength: 1, maxlength: 10 },
    locale: { type: String, minlength: 2, maxlength: 2 },
    color: { type: String, minlength: 7, maxlength: 7 },
    almanax: {
      auto: { type: Boolean },
      channel: { type: String }
    },
    dofus: {
      server: {
        id: { type: String },
        name: { type: String }
      },
      rss: {
        news: { type: String }
      }
    }
  }, { minimize: false }
);

export const guildModel = model('guild', schema);