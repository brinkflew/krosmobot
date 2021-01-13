import { almanaxModel } from '@/models/almanax';
import { channelModel } from '@/models/channel';
import { guildModel } from '@/models/guild';
import { logModel } from '@/models/log';
import { memberModel } from '@/models/member';
import { userModel } from '@/models/user';

export const models = {
  almanax: almanaxModel,
  channels: channelModel,
  guilds: guildModel,
  logs: logModel,
  members: memberModel,
  users: userModel
};
