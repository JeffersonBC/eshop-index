import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameComponent } from './game.component';
import { GameHomeComponent } from './game-home/game-home.component';
import { GameReviewsAllComponent } from './game-reviews-all/game-reviews-all.component';
import { GameVoteSimilarComponent } from './game-vote-similar/game-vote-similar.component';
import { GameVoteTagComponent } from './game-vote-tag/game-vote-tag.component';
import { VotedSimilarResolver } from '@resolvers/voted-similar.resolver';
import { VotedTagResolver } from '@resolvers/voted-tag.resolver';


const appRoutes: Routes = [
  { path: ':game_code', component: GameComponent,
    children: [
      { path: '', component: GameHomeComponent },
      { path: 'reviews', component: GameReviewsAllComponent },
      { path: 'vote/similar', component: GameVoteSimilarComponent,
        resolve: { votes: VotedSimilarResolver } },
      { path: 'vote/tag', component: GameVoteTagComponent,
        resolve: { votes: VotedTagResolver } },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
