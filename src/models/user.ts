import { Schema, model } from 'mongoose';

const schema = new Schema(
  {
    id: { type: String, required: true, index: true },
    locale: { type: String, minlength: 2, maxlength: 2 },
    color: { type: String, minlength: 7, maxlength: 7 },
    settings: {
      tasks: {
        almanax: { type: Boolean },
        news: { type: Boolean }
      },
      dofus: {
        server: { id: { type: String }, name: { type: String } }
      },
      channels: {
        almanax: { type: String },
        news: { type: String }
      }
    }
  }, { minimize: false }
);

export const userModel = model('user', schema);
