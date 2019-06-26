import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  defaultConf: any[] = [
    {move: 'Rock', kills: 'Scissors'},
    {move: 'Paper', kills: 'Rock'},
    {move: 'Scissors', kills: 'Paper'}
  ];

  conf: any[] = [
    {move: 'Rock', kills: 'Scissors'},
    {move: 'Paper', kills: 'Rock'},
    {move: 'Scissors', kills: 'Paper'}
  ];

  constructor() {
  }
}
