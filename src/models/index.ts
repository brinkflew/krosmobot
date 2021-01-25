import { almanaxModel } from '@/models/almanax';
import { channelModel } from '@/models/channel';
import { guildModel } from '@/models/guild';
import { logModel } from '@/models/log';
import { memberModel } from '@/models/member';
import { pollModel } from '@/models/poll';
import { reminderModel } from '@/models/reminder';
import { userModel } from '@/models/user';

export const models = {
  almanax: almanaxModel,
  channels: channelModel,
  guilds: guildModel,
  members: memberModel,
  polls: pollModel,
  reminders: reminderModel,
  users: userModel
};

export const logs = logModel;
