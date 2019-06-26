import {Component, OnInit, ViewChild} from '@angular/core';
import {RulesConfigurationComponent} from '../rules-configuration/rules-configuration.component';
import {AbstractControl, FormBuilder, FormControl, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  @ViewChild(RulesConfigurationComponent, {static: false}) rulesConfig: RulesConfigurationComponent;

  gameForm;
  players = {
    playerOne: '',
    playerTwo: ''
  };


  constructor(private formBuilder: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.gameForm = this.formBuilder.group({
      playerOne: new FormControl(this.players.playerOne, [
        Validators.required,
        Validators.minLength(3)
      ]),
      playerTwo: new FormControl(this.players.playerTwo, [
        Validators.required,
        Validators.minLength(3)
      ]),
    }, {
      validators: this.validUserName()
    });
  }

  startGame(players) {
    this.router.navigate(['/game', players]);
  }

  validUserName(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const same = control.get('playerOne').value === control.get('playerTwo').value;
      return same ? {validUserName: {value: control.value}} : null;
    };
  }

  get playerOne() {
    return this.gameForm.get('playerOne');
  }

  get playerTwo() {
    return this.gameForm.get('playerTwo');
  }

}
