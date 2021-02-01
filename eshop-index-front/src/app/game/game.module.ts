import { MaterializeModule } from 'angular2-materialize';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { GameRoutingModule } from './game-routing.module';
import { SharedModule } from '@shared/shared.module';

import { GameComponent } from './game.component';
import { GameHomeComponent } from './game-home/game-home.component';
import { GameReviewsAllComponent } from './game-reviews-all/game-reviews-all.component';
import { GameVoteSimilarComponent } from './game-vote-similar/game-vote-similar.component';
import { GameVoteTagComponent } from './game-vote-tag/game-vote-tag.component';


@NgModule({
  imports: [
    MaterializeModule,

    CommonModule,
    FormsModule,
    RouterModule,
    GameRoutingModule,

    SharedModule,
  ],
  declarations: [
    GameComponent,
    GameHomeComponent,
    GameReviewsAllComponent,
    GameVoteSimilarComponent,
    GameVoteTagComponent,
  ],
})
export class GameModule { }
