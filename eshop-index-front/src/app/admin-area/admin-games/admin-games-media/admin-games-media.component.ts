import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GameModel, GameMedia } from '@models';
import { GameService } from '@services/game.service';
import { GameMediaService } from '@services/game-media.service';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { doOnSubscribe } from '@shared/utils/observable-pipes.utils';


@Component({
  selector: 'app-admin-games-media',
  templateUrl: './admin-games-media.component.html',
  styleUrls: ['../../../shared/style/_admin-table.scss'],
})
export class AdminGamesMediaComponent implements OnInit {

  loading = false;

  gameId: number;
  game: GameModel;

  media: GameMedia[];
  media$: Observable<GameMedia[]>;

  constructor(
    private readonly gameService: GameService,
    private readonly gameMediaService: GameMediaService,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.gameId = this.route.snapshot.params['gameId'];

    this.gameService.getGameSimpleById(this.gameId)
      .subscribe( data => this.game = data );

    this.media$ = this.gameMediaService.getGameMediaAllByGameId(this.gameId)
      .pipe(
        map( data => { this.media = data; return data; }),
        finalize( () => this.loading = false ),
      );

    this.media$.subscribe();
  }

  order(mediaId: number, direction: 'up' | 'down') {
    this.gameMediaService.postGameMediaOrder(mediaId, direction)
      .pipe(doOnSubscribe( () => this.loading = true ))
      .subscribe( () => this.media$.subscribe() );
  }

}
