import { Argument } from 'discord-akairo';
import { Client } from '../../../src/structures';
import { createGuildMessage } from '../../utils/message';

export const line = (client: Client) => describe('Line', () => {
  const message = createGuildMessage(client);

  it('should be null if no value provided', async () => {
    const args = await Argument.cast('line', client.commands.resolver, message, '');
    expect(args).toEqual(null);
  });

  it('should be an array', async () => {
    const args = await Argument.cast('line', client.commands.resolver, message, 'prop1\nprop2');
    expect(args).toHaveLength(2);
  });

});
