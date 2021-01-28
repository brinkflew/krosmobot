import { Listener } from 'discord-akairo';
import { Message, MessageEmbed, MessageAttachment } from 'discord.js';
import { CanvasRenderService } from 'chartjs-node-canvas';
import { EMBEDS, DEFAULTS, CHARTS } from '@/constants';
import { splitToArray } from '@/utils';
import { PollDocument, DocumentSettings } from 'types';

/**
 * Emitted whenever a reaction is added to an existing message.
 */
export default class extends Listener {

  public constructor() {
    super('client-poll-close', {
      emitter: 'client',
      event: 'pollClose'
    });
  }

  /**
   * Closes a poll, removes reactions on its embed and
   * edits it to display the results in a graph.
   * @param message Message containing the poll's embed
   */
  public async exec(message: Message) {
    const { polls, guilds } = this.client.providers;
    const fetched = <PollDocument> polls.get(message.id);
    if (!fetched) return;

    const { propositions, answers, title } = fetched;
    void polls.delete(message.id);

    const oldEmbed = message.embeds;
    if (!oldEmbed?.length) return;

    const data: { propositions: (string | string[])[]; votes: number[] } = { propositions: [], votes: [] };
    propositions.forEach((proposition, index) => {
      data.propositions.push(splitToArray(proposition, 32));
      data.votes.push(answers[index].length);
    });

    const canvas = new CanvasRenderService(CHARTS.POLL_RESULT.width, CHARTS.POLL_RESULT.height * propositions.length, chart => {
      chart.plugins.register(CHARTS.POLL_RESULT.plugins);
    });

    const settings = <DocumentSettings> guilds.get(message.guild!.id)?.settings;
    const locale = this.client.locales.get(settings?.locale || DEFAULTS.LOCALE);
    const color = settings?.color || EMBEDS.COLORS.DEFAULT;

    const image = await canvas.renderToBuffer({
      ...CHARTS.POLL_RESULT.options,
      data: {
        labels: data.propositions,
        datasets: [{ label: 'Votes', data: data.votes, backgroundColor: color }]
      }
    });

    const attachment = new MessageAttachment(image, 'chart.png');
    const embed = new MessageEmbed({
      author: oldEmbed[0].author || undefined,
      color: oldEmbed[0].color || undefined,
      title: locale.translate('COMMAND_POLL_RESPONSE_RESULTS', title),
      files: [attachment],
      image: { url: 'attachment://chart.png' },
      footer: { text: locale.translate('COMMAND_POLL_RESPONSE_CLOSED_FOOTER') }
    });

    void message.delete();
    void message.channel.send(embed);
  }

}
