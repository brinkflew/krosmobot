import { Argument } from 'discord-akairo';
import { Client } from '../../../src/structures';
import { createDirectMessage, createGuildMessage } from '../../utils/message';

export const dofusServer = (client: Client) => describe('Dofus Server', () => {
  const message = createGuildMessage(client);
  const dm = createDirectMessage(client);

  it('should be null if no value and not in guild', async () => {
    const args = await Argument.cast('dofusServer', client.commands.resolver, dm, '');
    expect(args).toEqual(null);
  });

  it('should return an object if the server was found', async () => {
    const args = await Argument.cast('dofusServer', client.commands.resolver, dm, 'jahash');
    expect(args).toBeDefined();
    expect(args).toHaveProperty('id');
    expect(args).toHaveProperty('name');
    expect(args.name).toEqual('Jahash');
  });

  it('should return null if the server was not found', async () => {
    const args = await Argument.cast('dofusServer', client.commands.resolver, dm, 'test');
    expect(args).toEqual(null);
  });

  it('should return null if not set in the guild', async () => {
    const spy = jest.spyOn(client.providers.guilds, 'fetch');
    const args = await Argument.cast('dofusServer', client.commands.resolver, message, '');
    expect(spy).toBeCalledTimes(1);
    expect(args).toEqual(null);
  });

  it('should return an object if set for the guild', async () => {
    void client.providers.guilds.create(message.guild!.id, { dofus: { server: { id: '84', name: 'Jahash' } } });
    const spy = jest.spyOn(client.providers.guilds, 'fetch');
    const args = await Argument.cast('dofusServer', client.commands.resolver, message, '');
    expect(spy).toBeCalledTimes(1);
    expect(args).toHaveProperty('id');
    expect(args).toHaveProperty('name');
    expect(args.name).toEqual('Jahash');
  });

});
