import { Listener } from 'discord-akairo';
import { TextChannel } from 'discord.js';

/**
 * Emitted whenever a reaction is added to an existing message.
 */
export default class extends Listener {

  public constructor() {
    super('client-raw-event', {
      emitter: 'client',
      event: 'raw'
    });
  }

  /**
   * Executes when the event is fired.
   * - Handles reactions on uncached messages.
   */
  public async exec(packet: { [key: string]: any }) {
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;

    const channel = await this.client.channels.fetch(packet.d.channel_id);
    if (channel.type !== 'text' || !(channel instanceof TextChannel)) return;
    if (channel.messages.cache.has(packet.d.message_id)) return;

    const message = await channel.messages.fetch(packet.d.message_id);
    const emoji = packet.d.emoji.id
      ? `${(<string> packet.d.emoji.name)}:${(<string> packet.d.emoji.id)}`
      : packet.d.emoji.name;
    const reaction = message.reactions.cache.get(emoji);
    if (!reaction) return;

    const user = await this.client.users.fetch(packet.d.user_id);
    reaction.users.cache.set(packet.d.user_id, user);

    let event = null;
    switch (packet.t) {
      case 'MESSAGE_REACTION_ADD':
        event = 'messageReactionAdd';
        break;
      case 'MESSAGE_REACTION_REMOVE':
        event = 'messageReactionRemove';
        break;
      default:
        return;
    }

    return this.client.emit(event, reaction, user);
  }

}
