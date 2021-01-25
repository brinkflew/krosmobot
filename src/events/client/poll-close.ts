import { Listener } from 'discord-akairo';
import { Message, MessageEmbed, MessageAttachment } from 'discord.js';
import { CanvasRenderService } from 'chartjs-node-canvas';
import { EMBED_COLOR_DEFAULT, DEFAULT_LOCALE, pollChart } from '@/constants';
import { splitToArray } from '@/utils';

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
    const propositions: string[] = polls.get(message.id, 'propositions');
    const answers: string[][] = polls.get(message.id, 'answers');
    const title: string = polls.get(message.id, 'title');
    void polls.clear(message.id);

    const oldEmbed = message.embeds;
    if (!oldEmbed?.length) return;

    const data: { propositions: (string | string[])[]; votes: number[] } = { propositions: [], votes: [] };
    propositions.forEach((proposition, index) => {
      data.propositions.push(splitToArray(proposition, 32));
      data.votes.push(answers[index].length);
    });

    const canvas = new CanvasRenderService(pollChart.width, pollChart.height * propositions.length, chart => {
      chart.plugins.register(pollChart.plugins);
    });

    const settings = guilds.get(message.guild!.id, 'settings');
    const locale = this.client.locales.get(settings.locale || DEFAULT_LOCALE);
    const color = settings.color || EMBED_COLOR_DEFAULT;
    const image = await canvas.renderToBuffer({
      ...pollChart.options,
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
