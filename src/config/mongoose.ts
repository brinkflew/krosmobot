import { ConnectionOptions } from 'mongoose';

export const url = process.env.KROSMOBOT_MONGODB_URL || 'mongodb+srv://krosmobot@localhost/krosmobot';

const config: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

export default config;
