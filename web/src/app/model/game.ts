import {Round} from './round';

export class Game {
  id: bigint;
  'player_1': string;
  'player_2': string;
  winner: number;
  rules: object;
  rounds: Round[];
}
