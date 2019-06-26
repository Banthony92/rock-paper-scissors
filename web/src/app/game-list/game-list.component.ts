import {Component, OnInit} from '@angular/core';
import {ApiService} from './../services/api-service';
import {Game} from './../model/game';
import {GameList} from '../model/game-list';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  games: GameList;
  pages = [];

  constructor(public apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getGames().toPromise()
      .then(data => {
        this.games = data;
        if (data.total) {
          const numberPages = Math.ceil(this.games.total / this.games.per_page);
          for (let i = 1; i <= numberPages; i++) {
            this.pages.push({page: i, url: (data.path + '?page=' + i), active: (i === data.current_page)});
          }
        } else {
          this.pages = [];
        }
      });
  }

  changePage(url) {
    this.apiService.getGames(url).toPromise()
      .then(data => {
        this.games = data;
        if (data.total) {
          const numberPages = Math.ceil(this.games.total / this.games.per_page);
          this.pages = [];
          for (let i = 1; i <= numberPages; i++) {
            this.pages.push({page: i, url: (data.path + '?page=' + i), active: (i === data.current_page)});
          }
        }
      });
  };

}
