import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { finalize } from 'rxjs/operators';

import { GameModel, GameSelectGameCodeModel } from '@models';
import { AlikeService } from '@services/classification/alike.service';
import { AnalyticsService } from '@services/analytics.service';
import { GameService } from '@services/game.service';
import { SEOService } from '@services/seo.service';


@Component({
  selector: 'app-game-vote-similar',
  templateUrl: './game-vote-similar.component.html',
  styleUrls: ['../../shared/style/_admin-table.scss']
})
export class GameVoteSimilarComponent implements OnInit {

  game: GameModel;
  gameCode: string;

  gamesList: GameSelectGameCodeModel[];
  selectedGameCode: string;
  _loading = false;

  filteredGamesList: GameSelectGameCodeModel[];
  votedList: GameSelectGameCodeModel[];

  constructor(
    private readonly alikeService: AlikeService,
    private readonly analyticsService: AnalyticsService,
    private readonly gameService: GameService,
    private readonly route: ActivatedRoute,
    private readonly seoService: SEOService,
  ) { }

  ngOnInit() {
    this.votedList = this.route.snapshot.data['votes'] as GameSelectGameCodeModel[];
    this.gameCode = this.route.parent.snapshot.params['game_code'];

    this.gameService.getGameByGameCode(this.gameCode)
      .subscribe(data => {
        this.game = data;
        this.seoService.setTitle({windowTitle: this.game.title + ' | Vote for Similar Games'});
      });

    this.gameService.getGamesAllSelectGameCode()
      .subscribe(data => {
        this.gamesList = data;
        this.updateFilteredGameList();
      });
  }

  updateFilteredGameList() {
    this.filteredGamesList = this.gamesList.filter(
      game =>
        game.game_code !== this.gameCode &&
        !this.votedList.find(vote => vote.game_code === game.game_code)
      );
  }

  postVote() {
    if (!this.selectedGameCode) { return; }

    this._loading = true;

    this.alikeService.postVoteAlike(this.gameCode, this.selectedGameCode)
      .pipe(finalize( () => this._loading = false ))
      .subscribe(() => {
        const voteSimilar = this.gamesList.find(game => game.game_code === this.selectedGameCode);
        this.votedList.push(voteSimilar);

        this.selectedGameCode = null;
        this.updateFilteredGameList();

        this.analyticsService.trackEvent(
          `Add vote for similar to ${ voteSimilar.title }`,
          'Game - Vote for Similar',
          this.game.title,
        );
      });
  }

  deleteVote(arrayIndex: number) {
    this._loading = true;

    this.alikeService.deleteVoteAlike(this.gameCode, this.votedList[arrayIndex].game_code)
      .pipe(finalize( () => this._loading = false ))
      .subscribe(() => {
        this.votedList.splice(arrayIndex, 1);
        const voteSimilar = this.gamesList.find(game => game.game_code === this.selectedGameCode);

        this.selectedGameCode = null;
        this.updateFilteredGameList();

        this.analyticsService.trackEvent(
          `Remove vote for similar to ${ voteSimilar.title }`,
          'Game - Vote for Similar',
          this.game.title,
        );
      });
  }
}
