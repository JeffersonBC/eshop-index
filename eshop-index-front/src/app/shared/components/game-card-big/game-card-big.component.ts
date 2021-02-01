import { Component, Input } from '@angular/core';

import { GamePrices } from '@models';
import { RecomendationService } from '@services/classification/recomendation.service';
import { WishlistService } from '@services/classification/wishlist.service';
import { AnalyticsService } from '@services/analytics.service';
import { GameBaseComponent } from '@shared/base-components/game.base.component';


@Component({
  selector: 'app-game-card-big',
  templateUrl: './game-card-big.component.html',
  styleUrls: ['./game-card-big.component.scss']
})
export class GameCardBigComponent extends GameBaseComponent {

  ObjectKeys = Object.keys;
  @Input() prices: GamePrices = {};


  constructor(
    private readonly recomendationService: RecomendationService,
    private readonly wishlistService: WishlistService,
    private readonly analyticsService: AnalyticsService,
  ) {
    super(analyticsService, recomendationService, wishlistService);
  }

}
