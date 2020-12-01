export const github = 'https://github.com/brinkflew/krosmobot/blob/resources/{{folder}}/{{file}}?raw=true';

export const get = (url: string, folder: string, file: string) => url
  .replace('{{folder}}', folder)
  .replace('{{file}}', file);
