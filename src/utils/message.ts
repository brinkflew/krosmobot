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