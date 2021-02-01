import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GameModel, GameSelectIdModel } from '@models';
import { GameService } from '@services/game.service';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-admin-games-merge',
  templateUrl: './admin-games-merge.component.html',
  styleUrls: ['./admin-games-merge.component.scss']
})
export class AdminGamesMergeComponent implements OnInit {

  gameId: number;
  game: GameModel;

  gamesList: GameSelectIdModel[];
  selectedGameId: number;
  _loading = false;

  constructor(
    private readonly gameService: GameService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) { }

  ngOnInit() {
    this.gameId = this.route.snapshot.params['id'];

    this.gameService.getGameSimpleById(this.gameId)
      .subscribe( data => this.game = data );

    this.gameService.getGamesAllSelectId()
      .subscribe( data => this.gamesList = data );
  }

  merge() {
    if (this._loading) { return; }

    if (confirm('Are you SURE you want to merge these two games? This can\'t be undone.')) {
      this._loading = true;

      this.gameService.postGameMerge(this.gameId, this.selectedGameId)
        .pipe(finalize( () => this._loading = false ))
        .subscribe( () => this.router.navigate(['/', 'admin', 'games']) );
    }
  }

}
