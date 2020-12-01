import { Schema, model } from 'mongoose';

const schema = new Schema(
  {
    id: { type: String, required: true, index: true },
    jobs: {
      alchemist: { type: Number, min: 0, max: 200, default: 0 },
      jeweller: { type: Number, min: 0, max: 200, default: 0 },
      handyman: { type: Number, min: 0, max: 200, default: 0 },
      lumberjack: { type: Number, min: 0, max: 200, default: 0 },
      hunter: { type: Number, min: 0, max: 200, default: 0 },
      shoemagus: { type: Number, min: 0, max: 200, default: 0 },
      shoemaker: { type: Number, min: 0, max: 200, default: 0 },
      costumagus: { type: Number, min: 0, max: 200, default: 0 },
      craftmagus: { type: Number, min: 0, max: 200, default: 0 },
      artificer: { type: Number, min: 0, max: 200, default: 0 },
      smithmagus: { type: Number, min: 0, max: 200, default: 0 },
      smith: { type: Number, min: 0, max: 200, default: 0 },
      jewelmagus: { type: Number, min: 0, max: 200, default: 0 },
      miner: { type: Number, min: 0, max: 200, default: 0 },
      farmer: { type: Number, min: 0, max: 200, default: 0 },
      fisherman: { type: Number, min: 0, max: 200, default: 0 },
      carvmagus: { type: Number, min: 0, max: 200, default: 0 },
      carver: { type: Number, min: 0, max: 200, default: 0 },
      tailor: { type: Number, min: 0, max: 200, default: 0 }
    }
  }, { minimize: false }
);

export const MemberModel = model('member', schema);
