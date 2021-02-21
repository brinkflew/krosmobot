import { Argument } from 'discord-akairo';
import { Client } from '../../../src/structures';
import { createGuildMessage } from '../../utils/message';

export const oneline = (client: Client) => describe('One Line', () => {
  const message = createGuildMessage(client);

  it('should be null if no value provided', async () => {
    const args = await Argument.cast('oneline', client.commands.resolver, message, '');
    expect(args).toEqual(null);
  });

  it('should be equal to the first line of text', async () => {
    const args = await Argument.cast('oneline', client.commands.resolver, message, 'prop1\nprop2');
    expect(args).toEqual('prop1');
  });

});
