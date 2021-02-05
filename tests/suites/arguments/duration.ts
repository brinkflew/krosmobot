import { Argument } from 'discord-akairo';
import { Client } from '../../../src/structures';
import { createGuildMessage } from '../../utils/message';
import { TIME } from '../../../src/constants';

export const duration = (client: Client) => describe('Duration', () => {
  const message = createGuildMessage(client);

  it('should be null if no value', async () => {
    const args = await Argument.cast('duration', client.commands.resolver, message, '');
    expect(args).toEqual(null);
  });

  it('should parse 30s as 30 seconds', async () => {
    const args = await Argument.cast('duration', client.commands.resolver, message, '30s');
    expect(args).toEqual(TIME.MS_PER_SECOND * 30);
  });

  it('should parse 30m as 30 minutes', async () => {
    const args = await Argument.cast('duration', client.commands.resolver, message, '30m');
    expect(args).toEqual(TIME.MS_PER_MINUTE * 30);
  });

  it('should parse 12h as 12 hours', async () => {
    const args = await Argument.cast('duration', client.commands.resolver, message, '12h');
    expect(args).toEqual(TIME.MS_PER_HOUR * 12);
  });

  it('should parse 30d as 30 days', async () => {
    const args = await Argument.cast('duration', client.commands.resolver, message, '30d');
    expect(args).toEqual(TIME.MS_PER_DAY * 30);
  });

  it('should parse 30j as 30 days', async () => {
    const args = await Argument.cast('duration', client.commands.resolver, message, '30j');
    expect(args).toEqual(TIME.MS_PER_DAY * 30);
  });

  it('should default to days if no unit provided', async () => {
    const args = await Argument.cast('duration', client.commands.resolver, message, '5');
    expect(args).toEqual(TIME.MS_PER_DAY * 5);
  });

  it('should default to on day if the value provided is invalid', async () => {
    const args = await Argument.cast('duration', client.commands.resolver, message, 'abc');
    expect(args).toEqual(TIME.MS_PER_DAY);
  });

});
