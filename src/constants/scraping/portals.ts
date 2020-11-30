export const servers = [
  {
    id: 'id',
    selector: '.server > a',
    attribute: 'href',
    transform: (content: string) => content.split('/')[1]
  },
  {
    id: 'name',
    selector: '.server > a > h4',
    attribute: 'text'
  }
];

export const schema = [
  {
    id: 'dimension',
    selector: '.dimension h2',
    attribute: 'text'
  },
  {
    id: 'images.dimension',
    selector: '.dimension img',
    attribute: 'src'
  },
  {
    id: 'position',
    selector: '.infos h3:nth-of-type(1) > b',
    attribute: 'text'
  },
  {
    id: 'uses',
    selector: '.infos h3:nth-of-type(2) > b',
    attribute: 'text'
  },
  {
    id: 'cycle.title',
    selector: '.cycle h3',
    attribute: 'text'
  },
  {
    id: 'cycle.description',
    selector: '.cycle .modificateurs > :not(.visible-lg-inline) img',
    attribute: 'title',
    transform: (content: string) => content.split(':')[1]
  },
  { 
    id: 'images.cycle',
    selector: '.cycle .modificateurs > :not(.visible-lg-inline) img',
    attribute: 'src'
  },
  {
    id: 'update',
    selector: '.maj h3',
    attribute: 'text'
  }
];
