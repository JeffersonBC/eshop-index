import { Component, OnInit } from '@angular/core';

import { RecomendationService } from '@services/classification/recomendation.service';

import { GameBaseComponent } from '@shared/base-components/game.base.component';
import { WishlistService } from '@services/classification/wishlist.service';
import { AnalyticsService } from '@services/analytics.service';
import { GameService } from '@services/game.service';


@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent extends GameBaseComponent implements OnInit {

  showImage = false;

  date = '';
  region = '';

  constructor(
    public readonly gameService: GameService,
    private readonly analyticsService: AnalyticsService,
    private readonly recomendationService: RecomendationService,
    private readonly wishlistService: WishlistService,
  ) {
    super(analyticsService, recomendationService, wishlistService);
  }

  ngOnInit() {
    // Initializes the date
    if (this.game.release_us && this.game.release_eu) {
      if (this.game.release_us === this.game.release_eu) {
        this.date = this.game.release_us;

      } else if (this.game.release_us < this.game.release_eu) {
        this.date = this.game.release_us;
        this.region = 'NA: ';

      } else {
        this.date = this.game.release_eu;
        this.region = 'EU: ';
      }

    } else {
      if (this.game.release_us) {
        this.date = this.game.release_us;
        this.region = 'NA: ';

      } else {
        this.date = this.game.release_eu;
        this.region = 'EU: ';
      }
    }
  }

  deferLoad() {
    this.showImage = true;
  }

}
