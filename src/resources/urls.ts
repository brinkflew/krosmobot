export const github = 'https://raw.githubusercontent.com/brinkflew/krosmobot/resources/{{folder}}/{{file}}';

export const get = (url: string, folder: string, file: string) => url
  .replace('{{folder}}', folder)
  .replace('{{file}}', file);
