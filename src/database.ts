import mongoose from 'mongoose';
import config from '@/config/mongoose';

mongoose.connect(
  process.env.KROSMOBOT_MONGODB_URL || 'mongodb+srv://krosmobot@localhost.mongodb.name/krosmobot?retryWrites=true&w=majority',
  config
).then(() => {
  console.log('Database connected');
}).catch((error) => {
  console.error(error);
});
