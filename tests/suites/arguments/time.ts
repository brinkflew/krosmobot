import { Argument } from 'discord-akairo';
import { Client } from '../../../src/structures';
import { createGuildMessage } from '../../utils/message';
// import { TIME } from '../../../src/constants';

export const time = (client: Client) => describe('Time', () => {
  const message = createGuildMessage(client);

  it('should be null if no value', async () => {
    const args = await Argument.cast('time', client.commands.resolver, message, '');
    expect(args).toEqual(null);
  });

  it('should be null if the value provided is invalid', async () => {
    const args = await Argument.cast('time', client.commands.resolver, message, 'abc');
    expect(args).toEqual(null);
  });

  it('should parse a single number as hours', async () => {
    const args = await Argument.cast('time', client.commands.resolver, message, '08');
    const date = new Date(0);
    date.setHours(8, 0, 0, 0);
    expect(args).toEqual(date.valueOf());
  });

  it('should parse two numbers as hours and minutes', async () => {
    const args = await Argument.cast('time', client.commands.resolver, message, '08h30');
    const date = new Date(0);
    date.setHours(8, 30, 0, 0);
    expect(args).toEqual(date.valueOf());
  });

  it('should parse three numbers as a hours, minutes and seconds', async () => {
    const args = await Argument.cast('time', client.commands.resolver, message, '8:30:15');
    const date = new Date(0);
    date.setHours(8, 30, 15, 0);
    expect(args).toEqual(date.valueOf());
  });

});
