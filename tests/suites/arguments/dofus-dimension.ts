import { Argument } from 'discord-akairo';
import { Client } from '../../../src/structures';
import { createGuildMessage } from '../../utils/message';

export const dofusDimension = (client: Client) => describe('Dofus Dimension', () => {
  const message = createGuildMessage(client);

  it('should be null if no value', async () => {
    const args = await Argument.cast('dofusDimension', client.commands.resolver, message, '');
    expect(args).toEqual(null);
  });

  it('should return a string if the dimension was found', async () => {
    const args = await Argument.cast('dofusDimension', client.commands.resolver, message, 'ecaflipus');
    expect(args).toBeDefined();
    expect(args).toEqual('ecaflipus');
  });

  it('should be null if the dimension was not found', async () => {
    const args = await Argument.cast('dofusDimension', client.commands.resolver, message, 'invalid-dimension');
    expect(args).toEqual(null);
  });

});
