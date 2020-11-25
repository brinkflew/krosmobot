import { Schema, model } from 'mongoose';

const schema = new Schema(
  {
    id: { type: String, required: true, index: true },
    level: { type: String, default: 'INFO' },
    message: { type: String, required: true },
    timestamp: { type: Number, default: Date.now(), index: { expires: '30d' } }
  }, { minimize: false }
);

export const LogModel = model('log', schema);
