import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {RulesService} from '../services/rules.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ApiService} from '../services/api-service';
import {RulesConfigurationComponent} from '../rules-configuration/rules-configuration.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

  roundForm;
  playerOne: string;
  playerTwo: string;
  playerOneWins = 0;
  playerTwoWins = 0;
  currentRound = {
    move1: {
      move: '',
      kills: ''
    },
    move2: {
      move: '',
      kills: ''
    },
  };
  turn = 1;
  round = 1;
  results = [];
  conf: any[];
  move = '';
  winner = '';

  @ViewChild(RulesConfigurationComponent, {static: false}) rulesConfig: RulesConfigurationComponent;

  constructor(private route: ActivatedRoute, public ruleService: RulesService, private formBuilder: FormBuilder,
              public apiService: ApiService) {
  }

  ngOnInit() {
    this.playerOne = this.route.snapshot.paramMap.get('playerOne');
    this.playerTwo = this.route.snapshot.paramMap.get('playerTwo');
    this.conf = this.ruleService.conf;

    this.roundForm = this.formBuilder.group({
      move: new FormControl(this.move,
        [Validators.required])
    });
  }

  nextRound(values) {
    if (this.turn === 2) {
      this.currentRound.move2 = values.move;
      let winner = 'DRAW';
      if (this.currentRound.move1.kills === this.currentRound.move2.move) {
        winner = this.playerOne;
        this.playerOneWins++;
      } else if (this.currentRound.move2.kills === this.currentRound.move1.move) {
        winner = this.playerTwo;
        this.playerTwoWins++;
      }
      this.results.push({move_player_1: this.currentRound.move1.move, move_player_2: this.currentRound.move2.move, winner});
      if (this.playerOneWins < 3 && this.playerTwoWins < 3) {
        this.round++;
        this.turn = 0;
      } else {
        this.winner = this.playerOneWins === 3 ? this.playerOne : this.playerTwo;
        const game = {
          player_1: this.playerOne,
          player_2: this.playerTwo,
          winner: this.winner,
          rounds: this.results,
          rules: this.conf
        };
        this.apiService.postGame(game).toPromise()
          .then(data => {
          })
          .catch(error => console.log(error));
      }
    } else {
      this.currentRound.move1 = values.move;
    }
    this.roundForm.reset();
    this.turn++;
  }

  playAgain() {
    this.turn = 1;
    this.conf = this.ruleService.conf;
    this.results = [];
    this.round = 1;
    this.playerOneWins = 0;
    this.playerTwoWins = 0;
    this.currentRound = {
      move1: {
        move: '',
        kills: ''
      },
      move2: {
        move: '',
        kills: ''
      },
    };
  }

}
