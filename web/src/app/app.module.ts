import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {HttpClientModule} from '@angular/common/http';
import {GameListComponent} from './game-list/game-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RulesConfigurationComponent} from './rules-configuration/rules-configuration.component';
import {RouterModule} from '@angular/router';
import { IndexComponent } from './index/index.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    RulesConfigurationComponent,
    IndexComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: IndexComponent},
      {path: 'game', component: GameComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
