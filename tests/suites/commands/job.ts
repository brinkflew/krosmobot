import { SnowflakeUtil } from 'discord.js';
import { MockGuildMember, MockUser } from 'jest-discordjs-mocks';
import { MemberDocument } from 'types';
import { Client, Command } from '../../../src/structures';
import { createGuildMessage } from '../../utils/message';

export const job = (client: Client) => describe('Job', () => {
  const message = createGuildMessage(client);
  const spies: { [key: string]: jest.SpyInstance } = {};
  let command: Command; // eslint-disable-line @typescript-eslint/init-declarations
  let args: any = {};   // eslint-disable-line @typescript-eslint/init-declarations

  const user = new MockUser(client, { id: SnowflakeUtil.generate(), username: 'TestUser' });
  const member = new MockGuildMember(client, { id: SnowflakeUtil.generate(), displayName: 'Test User', user }, message.guild);

  const provider = client.providers.members;

  message.guild!.members.cache.set(member.id, member);
  provider.cache.set(member.id, {
    id: `${message.guild!.id}:${member.id}`,
    jobs: {
      tailor: 100,
      smith: 50
    }
  } as MemberDocument);

  const setup = async (content: string) => {
    message.content = content;
    message.author.avatarURL = jest.fn();
    const split = content.split(' ');
    const name = split.shift()?.slice(1);
    const rest = split.join(' ');

    command = <Command> client.commands.modules.get(name!);

    spies.embed = jest.spyOn(command, 'embed');
    spies.warning = jest.spyOn(command, 'warning');
    spies.error = jest.spyOn(command, 'error');
    spies.t = jest.spyOn(message, 't');

    if (command && rest.length) args = await command.parse(message, rest);

    // eslint-disable-next-line @typescript-eslint/require-await
    provider.update = jest.fn(async (id: string, record: MemberDocument) => {
      record.id = id;
      provider.cache.set(id, record);
      return record;
    });

    // eslint-disable-next-line @typescript-eslint/require-await
    provider.create = jest.fn(async (id: string, record: MemberDocument) => {
      record.id = id;
      provider.cache.set(id, record);
      return record;
    });

    spies.update = jest.spyOn(provider, 'update');
  };

  it('should warn if a level is provided without a job', async () => {
    await setup('!job 150');
    expect(spies.warning).toBeCalledTimes(1);
    expect(spies.t).toHaveBeenCalledWith('COMMAND_JOBS_ARGUMENTS_LEVEL_IGNORED');
  });

  it('should warn if an unparsable argument is provided', async () => {
    await setup('!job tailor invalid');
    expect(spies.warning).toBeCalledTimes(1);
    expect(spies.t).toHaveBeenCalledWith('COMMAND_JOBS_ARGUMENTS_UNKNOWN', ['invalid']);
  });

  it('should correct the level if below 1', async () => {
    await setup('!job tailor -10');
    expect(args.level).toBeDefined();
    expect(typeof args.level).toEqual('number');
    expect(args.level).toEqual(1);
  });

  it('should correct the level if above 200', async () => {
    await setup('!job tailor 300');
    expect(args.level).toBeDefined();
    expect(typeof args.level).toEqual('number');
    expect(args.level).toEqual(200);
  });

  it('should error if an invalid combination of arguments is provided', async () => {
    await setup(`!job tailor 100 <@${message.member!.id}>`);
    await command.exec(message, args);
    expect(spies.error).toBeCalledTimes(1);
    expect(spies.t).toHaveBeenCalledWith('COMMAND_JOBS_RESPONSE_INVALID_COMBINATION', args);
  });

  it('should warn if no member have the job provided', async () => {
    await setup('!job lumberjack');
    await command.exec(message, args);
    expect(spies.warning).toBeCalledTimes(1);
    expect(spies.t).toBeCalledWith('COMMAND_JOB_RESPONSE_NOBODY', 'COMMAND_JOB_RESPONSE_JOB_LUMBERJACK');
  });

  it('should warn if no jobs are registered for the member provided', async () => {
    await setup(`!job <@${message.member!.id}>`);
    await command.exec(message, args);
    expect(spies.warning).toBeCalledTimes(1);
    expect(spies.t).toBeCalledWith('COMMAND_JOB_RESPONSE_NOJOBS', message.member!.displayName);
  });

  it('should warn if no jobs are registered for the member who sent the message', async () => {
    await setup(`!job`);
    await command.exec(message, args);
    expect(spies.warning).toBeCalledTimes(1);
    expect(spies.t).toBeCalledWith('COMMAND_JOB_RESPONSE_NOJOBS', message.member!.displayName);
  });

  it('should warn if the provided job is not referenced for the provided member', async () => {
    await setup(`!job tailor <@${message.member!.id}>`);
    await command.exec(message, args);
    expect(spies.warning).toBeCalledTimes(1);
    expect(spies.t).toBeCalledWith('COMMAND_JOB_RESPONSE_NOJOB', message.member!.displayName, 'COMMAND_JOB_RESPONSE_JOB_TAILOR');
  });

  it('should save the level to the database', async () => {
    await setup('!job tailor 100');
    await command.exec(message, args);
    expect(spies.update).toBeCalledTimes(1);
    const id = `${message.guild!.id}:${message.member!.id}`;
    expect(spies.update).toBeCalledWith(id, { id, jobs: { tailor: 100 } });
    expect(spies.embed).toBeCalledTimes(1);
    expect(spies.t).toBeCalledWith('COMMAND_JOB_RESPONSE_TITLE_SINGLE');
  });

  it('should display the level of all members with the job provided', async () => {
    await setup('!job tailor');
    await command.exec(message, args);
    expect(spies.embed).toBeCalledTimes(1);
    expect(spies.t).toBeCalledWith('COMMAND_JOB_RESPONSE_JOB_TAILOR');
  });

  it('should display all jobs for the member provided', async () => {
    await setup(`!job <@${message.member!.id}>`);
    await command.exec(message, args);
    expect(spies.embed).toBeCalledTimes(1);
    expect(spies.t).toBeCalledWith('COMMAND_JOB_RESPONSE_TITLE_ALL');
  });

  it('should display all jobs for the member who sent the message', async () => {
    await setup(`!job`);
    await command.exec(message, args);
    expect(spies.embed).toBeCalledTimes(1);
    expect(spies.t).toBeCalledWith('COMMAND_JOB_RESPONSE_TITLE_ALL');
  });

  it('should display the provided job for the member provided', async () => {
    await setup(`!job tailor <@${message.member!.id}>`);
    await command.exec(message, args);
    expect(spies.embed).toBeCalledTimes(1);
    expect(spies.t).toBeCalledWith('COMMAND_JOB_RESPONSE_TITLE_SINGLE');
  });

});
