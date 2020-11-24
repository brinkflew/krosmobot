import { ConnectionOptions } from 'mongoose';

const config: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

export default config;
