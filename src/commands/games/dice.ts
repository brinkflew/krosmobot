import Canvas from 'canvas';
import { Message, MessageAttachment } from 'discord.js';
import { Command } from '@/structures';
import { PICTURES } from '@/constants';
import { formatNumber } from '@/utils';

const font = 'px serif';
const target = { width: 130, height: 84 };
const diceRegExpString = `(-?[0-9.,]*)d(-?[0-9.,]+)`;

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
        'example': 'COMMAND_DICE_DESCRIPTION_EXAMPLE'
      },
      regex: (message: Message) => this.getRegex(message),
      args: [
        {
          id: 'rolls',
          type: (_message: Message, phrase: string) => this.expressions.dice.exec(phrase),
          description: 'COMMAND_DICE_DESCRIPTION_ARGUMENT_ROLLS'
        }
      ]
    });
  }

  /**
   * Helper regular expressions.
   */
  private get expressions() {
    return {
      dice: new RegExp(diceRegExpString, 'i'),
      aliases: new RegExp(`^(${this.aliases.join('|')})`, 'i')
    };
  }

  /**
   * Run the command
   * @param message Message received from Discord
   */
  public async exec(message: Message, args: any) {
    if (!args.rolls) {
      const toParse = message.util?.parsed?.afterPrefix?.replace(this.expressions.aliases, '').trim();
      args.rolls = this.expressions.dice.exec(toParse?.length ? toParse : '1d6');
    }

    if (this.isFloat(args.rolls[1]) || this.isFloat(args.rolls[2])) return this.error(message, message.t('COMMAND_DICE_ERROR_FLOAT'));

    let rolls = parseInt(args.rolls[1], 10);
    if (isNaN(rolls)) rolls = 1;
    if (rolls < 1) return this.error(message, message.t('COMMAND_DICE_ERROR_ROLLS_ZERO'));
    if (rolls >= 10e3) return this.error(message, this.t('COMMAND_DICE_ERROR_ROLLS', message, 10e3 - 1));

    let size = parseInt(args.rolls[2], 10);
    if (isNaN(size)) size = 6;
    if (size < 1) return this.error(message, message.t('COMMAND_DICE_ERROR_SIZE_ZERO'));
    if (size >= 10e5) return this.error(message, this.t('COMMAND_DICE_ERROR_SIZE', message, 10e5 - 1));

    const scores: number[] = [];

    for (let roll = rolls; roll > 0; --roll) {
      scores.push(1 + Math.floor(size * Math.random()));
    }

    const total = scores.reduce((a, b) => a + b, 0);

    const background = await Canvas.loadImage(PICTURES.CANVAS.DICE);
    const canvas = Canvas.createCanvas(background.width, background.height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(background, 0, 0, background.width, background.height);

    const text = formatNumber(total);
    let textSize = target.height / 2;
    ctx.font = `${textSize}${font}`;

    while (ctx.measureText(text).width > target.height / 2) {
      textSize -= 2;
      ctx.font = `${textSize}${font}`;
    }

    ctx.fillStyle = '#48433f';
    ctx.translate((canvas.width - target.width) / 2, (canvas.height - target.height) / 2);
    ctx.transform(target.width / target.height, 0, 0, 1, 0, 0);
    ctx.rotate(45 * Math.PI / 180);
    ctx.fillText(text, (75 - ctx.measureText(text).width) / 2, (textSize - 60) / 2);

    const attachment = new MessageAttachment(canvas.toBuffer(), 'dice.png');

    return this.embed(message, {
      author: { name: message.t('COMMAND_DICE_RESPONSE_EXPLAIN', rolls, size) },
      title: message.t('COMMAND_DICE_RESPONSE_TOTAL', total),
      description: message.t('COMMAND_DICE_RESPONSE_DETAIL', scores),
      files: [attachment],
      thumbnail: { url: `attachment://dice.png` }
    });
  }

  /**
   * Build the regular expression that determines wheter the command should be triggered.
   * @param message Message that triggered this command
   */
  private getRegex(message: Message): RegExp {
    const prefix = this.getPrefix(message);
    return new RegExp(`^${prefix}(?:${this.aliases.join('|\s')})?\s*${diceRegExpString}`, 'i');
  }

  /**
   * Check whether the string representation of a value contains decimal spacing
   * characaters (dot or comma).
   * @param value Numeric value to check
   */
  private isFloat(value: string): boolean {
    return Boolean(/(?:\.|\,)/.exec(value));
  }

}
