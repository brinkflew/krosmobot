import { Argument } from 'discord-akairo';
import { Client } from '../../../src/structures';
import { createGuildMessage } from '../../utils/message';

export const dofusJob = (client: Client) => describe('Dofus Job', () => {
  const message = createGuildMessage(client);

  it('should be null if no value', async () => {
    const args = await Argument.cast('dofusJob', client.commands.resolver, message, '');
    expect(args).toEqual(null);
  });

  it('should return a string if the job was found', async () => {
    const args = await Argument.cast('dofusJob', client.commands.resolver, message, 'lumberjack');
    expect(args).toBeDefined();
    expect(args).toEqual('lumberjack');
  });

  it('should be null if the job was not found', async () => {
    const args = await Argument.cast('dofusJob', client.commands.resolver, message, 'invalid-job');
    expect(args).toEqual(null);
  });

});
