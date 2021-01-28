import { Schema, model } from 'mongoose';

const schema = new Schema(
  {
    id: { type: String, required: true, index: true },
    settings: {
      prefix: { type: String, minlength: 1, maxlength: 10 },
      locale: { type: String, minlength: 2, maxlength: 2 },
      color: { type: String, minlength: 7, maxlength: 7 }
    }
  }, { minimize: false }
);

export const userModel = model('user', schema);
