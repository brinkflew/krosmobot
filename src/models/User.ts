import { Schema, model } from 'mongoose';

const schema = new Schema(
  {
    id: { type: String, required: true, index: true },
    locale: { type: String, minlength: 2, maxlength: 2 }
  }, { minimize: false }
);

export const UserModel = model('user', schema);
