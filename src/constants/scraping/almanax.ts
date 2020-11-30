export const schema = [
  {
    id: 'title',
    selector: '.more-infos > p',
    attribute: 'text'
  },
  {
    id: 'offering',
    selector: '.more-infos-content p',
    attribute: 'text'
  },
  {
    id: 'bonus.title',
    selector: '.mid',
    attribute: 'text',
    transform: (content: string) => content.split('\n')[0]
  },
  {
    id: 'bonus.description',
    selector: '.mid .more',
    attribute: 'text',
    transform: (content: string) => content.split('\n')[0]
  },
  {
    id: 'images.meryde',
    selector: '#almanax_boss_image img',
    attribute: 'src'
  },
  {
    id: 'images.item',
    selector: '.more-infos-content img',
    attribute: 'src'
  },
  {
    id: 'meryde',
    selector: '#almanax_boss_desc',
    attribute: 'text',
    transform: (content: string) => content.split('\n')[1]
  },
  {
    id: 'description',
    selector: '#almanax_meryde_effect > p',
    attribute: 'text'
  },
  {
    id: 'month',
    selector: '.day-text',
    attribute: 'text'
  },
  {
    id: 'day',
    selector: '.day-number',
    attribute: 'text'
  }
];
