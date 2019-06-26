import {Game} from './game';

export class GameList {
  'current_page': number;
  data: Game[];
  'first_page_url': string;
  'from': string;
  'last_page': number;
  'last_page_url': string;
  'next_page_url': string;
  path: string;
  'per_page': number;
  'prev_page_url': string;
  to: string;
  total: number;
}
