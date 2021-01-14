import { Message } from 'discord.js';
import { Command } from '@/structures';

/**
 * Roll one or multiple dices.
 */
export default class DiceCommand extends Command {

  public constructor() {
    super('dice', {
      aliases: ['roll'],
      description: {
        'short': 'COMMAND_DICE_DESCRIPTION_SHORT',
        'extended': 'COMMAND_DICE_DESCRIPTION_EXTENDED',
        'example': 'COMMAND_DICE_DESCRIPTION_EXAMPLE',
        'usage': 'COMMAND_DICE_DESCRIPTION_USAGE'
      },
      regex: (message: Message) => this.getRegex(message),
      args: [
        {
          id: 'match',
          type: (_message: Message, phrase: string) => {
            if (!phrase) return null;
            return /([0-9]*)d([0-9]+)/i.exec(phrase);
          }
        }
      ]
    });
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, args: any) {
    if (!args?.match || args.match.length < 3) args = { match: [null, '1', '6'] };

    let rolls = parseInt(args.match[1], 10);
    if (isNaN(rolls)) rolls = 1;
    if (rolls >= 10e3) return this.error(message, this.t('COMMAND_DICE_ERROR_ROLLS', message));

    let size = parseInt(args.match[2], 10);
    if (isNaN(size)) size = 6;
    if (size >= 10e5) return this.error(message, this.t('COMMAND_DICE_ERROR_SIZE', message));

    const scores: number[] = [];

    for (let roll = rolls; roll > 0; --roll) {
      scores.push(1 + Math.floor(size * Math.random()));
    }

    const total = scores.reduce((a, b) => a + b, 0);

    return this.embed(message, {
      author: { name: this.t('COMMAND_DICE_RESPONSE_EXPLAIN', message, rolls, size) },
      title: this.t('COMMAND_DICE_RESPONSE_TOTAL', message, total)
    });
  }

  /**
   * Build the regular expression that determines wheter the command should be triggered.
   * @param message Message that triggered this command
   */
  private getRegex(message: Message): RegExp {
    const prefix = this.getPrefix(message);
    return new RegExp(`^${prefix}(?:${this.aliases.join('|\s')})?\s*([0-9]*)d([0-9]+)`, 'i');
  }

}
