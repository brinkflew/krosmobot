import { Argument } from 'discord-akairo';
import { Client } from '../../../src/structures';
import { createGuildMessage } from '../../utils/message';
// import { TIME } from '../../../src/constants';

export const date = (client: Client) => describe('Date', () => {
  const message = createGuildMessage(client);

  it('should be null if no value', async () => {
    const args = await Argument.cast('date', client.commands.resolver, message, '');
    expect(args).toEqual(null);
  });

  it('should be null if the value provided is invalid', async () => {
    const args = await Argument.cast('date', client.commands.resolver, message, 'abc');
    expect(args).toEqual(null);
  });

  it('should parse a single number as a day of the current month and year', async () => {
    const args = await Argument.cast('date', client.commands.resolver, message, '08');
    const date = new Date();
    date.setHours(1, 0, 0, 0);
    date.setDate(8);
    expect(args).toEqual(date.valueOf());
  });

  it('should parse two numbers as a day and month of the current year', async () => {
    const args = await Argument.cast('date', client.commands.resolver, message, '08/10');
    const date = new Date();
    date.setHours(1, 0, 0, 0);
    date.setMonth(10, 8);
    expect(args).toEqual(date.valueOf());
  });

  it('should parse three numbers as a date', async () => {
    const args = await Argument.cast('date', client.commands.resolver, message, '08/10/2025');
    const date = new Date();
    date.setHours(1, 0, 0, 0);
    date.setFullYear(2025, 10, 8);
    expect(args).toEqual(date.valueOf());
  });

  it('should parse three numbers as a date in the current century if provided in two-numbers format', async () => {
    const args = await Argument.cast('date', client.commands.resolver, message, '08/10/25');
    const date = new Date();
    date.setHours(1, 0, 0, 0);
    date.setFullYear(2025, 10, 8);
    expect(args).toEqual(date.valueOf());
  });

});
