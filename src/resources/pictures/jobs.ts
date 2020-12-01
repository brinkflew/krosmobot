import { get, github } from '../urls';

const jobs = [
  'alchemist',
  'jeweller',
  'handyman',
  'lumberjack',
  'hunter',
  'shoemagus',
  'shoemaker',
  'costumagus',
  'craftmagus',
  'artificer',
  'smithmagus',
  'smith',
  'jewelmagus',
  'miner',
  'farmer',
  'fisherman',
  'carvmagus',
  'carver',
  'tailor'
];

const pictures: { [key: string]: string } = {};
jobs.forEach((job) => pictures[job] = get(github, 'pictures', job));
export default pictures;
