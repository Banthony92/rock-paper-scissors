import {Component, OnInit} from '@angular/core';
import {RulesService} from '../services/rules.service';
import {AbstractControl, FormBuilder, FormControl, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-rules-configuration',
  templateUrl: './rules-configuration.component.html',
  styleUrls: ['./rules-configuration.component.scss']
})
export class RulesConfigurationComponent implements OnInit {

  newConf: any[];
  moveForm;
  newMove = {
    move: '',
    kills: ''
  };

  constructor(public ruleService: RulesService, private formBuilder: FormBuilder) {
    this.moveForm = this.formBuilder.group({
      move: new FormControl(this.newMove.move, [
        Validators.required,
        Validators.minLength(3),
        this.validMove()
      ]),
      kills: new FormControl(this.newMove.kills, [
        Validators.required
      ]),
    });
  }

  ngOnInit() {
  }

  restoreRules() {
    this.newConf = JSON.parse(JSON.stringify(this.ruleService.defaultConf));
  }

  openConfig() {
    this.newConf = JSON.parse(JSON.stringify(this.ruleService.conf));
    this.moveForm.reset();
  }

  saveChanges() {
    this.ruleService.conf = this.newConf;
  }

  addMove(values) {
    this.newConf.push(values);
    this.moveForm.reset();
  }

  removeMove(index) {
    this.newConf.splice(index, 1);
  }

  validMove(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const exist = control.value && this.newConf.find(conf => conf.move.toLowerCase() === control.value.toLowerCase());
      return exist ? {validMove: {value: control.value}} : null;
    };
  }

  get move() {
    return this.moveForm.get('move');
  }

  get kills() {
    return this.moveForm.get('kills');
  }
}
