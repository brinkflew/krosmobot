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

const s: any[] = [];

['ecaflipus', 'enutrosor', 'srambad', 'xelorium'].map((dimension, index) => {
  const portal = `.portal:nth-of-type(${index + 2})`;
  return s.push(
    {
      id: `${dimension}.dimension`,
      selector: `${portal} .dimension h2`,
      attribute: 'text'
    },
    {
      id: `${dimension}.images.dimension`,
      selector: `${portal} .dimension img`,
      attribute: 'src'
    },
    {
      id: `${dimension}.position`,
      selector: `${portal} .infos h3:nth-of-type(1) > b`,
      attribute: 'text'
    },
    {
      id: `${dimension}.uses`,
      selector: `${portal} .infos h3:nth-of-type(2) > b`,
      attribute: 'text'
    },
    {
      id: `${dimension}.cycle.title`,
      selector: `${portal} .cycle h3`,
      attribute: 'text'
    },
    {
      id: `${dimension}.cycle.description`,
      selector: `${portal} .cycle .modificateurs > :not(.visible-lg-inline) img`,
      attribute: 'title',
      transform: (content: string) => content.split(':')[1]
    },
    {
      id: `${dimension}.images.cycle`,
      selector: `${portal} .cycle .modificateurs > :not(.visible-lg-inline) img`,
      attribute: 'src'
    },
    {
      id: `${dimension}.update`,
      selector: `${portal} .maj h3`,
      attribute: 'text'
    }
  );
});

export const schema = s;
