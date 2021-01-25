import { Schema, model } from 'mongoose';

const schema = new Schema(
  {
    id: { type: String, required: true, index: true },
    guild: { type: String, required: true },
    author: { type: String, required: true },
    channel: { type: String, required: true },
    title: { type: String, required: true },
    propositions: [{ type: String, required: true }],
    answers: { type: [[String]] },
    timestamp: { type: Number, required: true },
    multi: { 'type': Boolean, 'default': true }
  }, { minimize: false }
);

export const pollModel = model('poll', schema);
