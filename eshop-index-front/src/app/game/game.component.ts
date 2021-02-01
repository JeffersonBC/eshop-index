import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GameModel, ReviewModel, TagsPerGroup, GamePrices } from '@models';
import { GameService } from '@services/game.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: [],
})
export class GameComponent implements OnInit {

  game: GameModel;
  prices: GamePrices;

  constructor(
    private readonly gameService: GameService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.gameService.getGameByGameCode(params['game_code'])
        .subscribe(response => this.game = response);

      this.gameService.getPriceAllByGameCode(params['game_code'])
        .subscribe(response => this.prices = response);
    });
  }

}
