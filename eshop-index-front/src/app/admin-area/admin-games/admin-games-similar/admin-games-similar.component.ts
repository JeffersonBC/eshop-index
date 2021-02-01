import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GameModel, GameSelectIdModel } from '@models';
import { GameService } from '@services/game.service';
import { AlikeService } from '@services/classification/alike.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-admin-games-similar',
  templateUrl: './admin-games-similar.component.html',
  styleUrls: ['../../../shared/style/_admin-table.scss'],
})
export class AdminGamesSimilarComponent implements OnInit {

  gameId: number;
  game: GameModel;

  gamesList: GameSelectIdModel[];
  selectedGameId: number;
  _loading = false;

  confirmedList: GameSelectIdModel[] = [];

  constructor(
    private readonly alikeService: AlikeService,
    private readonly gameService: GameService,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.gameId = this.route.snapshot.params['id'];

    this.gameService.getGameSimpleById(this.gameId)
      .subscribe( data => this.game = data );

    this.gameService.getGamesAllSelectId()
      .subscribe( data => this.gamesList = data );

    this.alikeService.getAlikeAdminByGame(this.gameId)
      .subscribe( data => this.confirmedList = data );
  }

  postSimilar() {
    this._loading = true;

    this.alikeService.postAlikeAdmin(this.gameId, this.selectedGameId)
      .pipe(finalize( () => this._loading = false ))
      .subscribe(() => {
        const newSimilarGame = this.gamesList.find(game => game.id == this.selectedGameId);
        this.confirmedList.push(newSimilarGame);
      });
  }

  deleteSimilar(arrayIndex: number) {
    this._loading = true;

    this.alikeService.deleteAlikeAdmin(this.gameId, this.confirmedList[arrayIndex].id)
      .pipe(finalize( () => this._loading = false ))
      .subscribe( () => this.confirmedList.splice(arrayIndex, 1) );
  }
}
