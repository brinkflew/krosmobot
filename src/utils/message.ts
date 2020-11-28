/**
 * Crafts a codeblock.
 * @param text Code to display
 * @param lang Language of the code block, for syntax highlighting
 */
export const code = (text: string | string[], lang: string = 'txt') => {
  if (!Array.isArray(text)) text = [text];
  return [
    `\`\`\`${lang}`,
    text.join('\n'),
    '```'
  ].join('\n');
}

/**
 * Generate a oneliner code block to show usage for a command.
 * @param prefix Prefix for the command
 * @param command Usage string for the command
 */
export const usage = (prefix: string, command: string) => {
  return code(`${prefix}${command}`);
}

/**
 * Formats an argument to use in the usage of a command.
 * @param argument Argument's name
 */
export const argument = (argument: string) => {
  return `\`${argument}\` →`;
}
