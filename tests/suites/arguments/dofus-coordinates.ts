import { Argument } from 'discord-akairo';
import { Client } from '../../../src/structures';
import { createGuildMessage } from '../../utils/message';

export const dofusCoordinates = (client: Client) => describe('Dofus Coordinates', () => {
  const message = createGuildMessage(client);

  it('should be null if no value', async () => {
    const args = await Argument.cast('dofusCoordinates', client.commands.resolver, message, '');
    expect(args).toEqual(null);
  });

  it('should return an object with coordinates', async () => {
    const args = await Argument.cast('dofusCoordinates', client.commands.resolver, message, '10,-5');
    expect(args).toBeDefined();
    expect(args).toEqual({ x: 10, y: -5, world: 'main' });
  });

});
