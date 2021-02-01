import { toast } from 'angular2-materialize';

import { finalize } from 'rxjs/operators';

import { GameModel } from '@models';
import { RecomendationService } from '@services/classification/recomendation.service';
import { WishlistService } from '@services/classification/wishlist.service';
import { AnalyticsService } from '@services/analytics.service';
import { Input } from '@angular/core';


export class GameBaseComponent {

  @Input() analyticsCategory = 'Game Card';
  @Input() game: GameModel;

  _loadingThumbs = false;

  constructor(
    private readonly baseAnalyticsService: AnalyticsService,
    private readonly baseRecomendationService: RecomendationService,
    private readonly baseWishlistService: WishlistService,
  ) { }


  clickWishlist() {
    if (this._loadingThumbs ) { return; }

    if (this.game.has_review || this.game.recomends !== null) {
      toast('You can\'t add to your wish list a game you have already classified or reviewed.', 2000);

    } else {
      this._loadingThumbs = true;

      if (this.game.has_wish) {
        this.baseWishlistService.deleteWishlistItem(this.game.game_code)
          .pipe(finalize( () => this._loadingThumbs = false ))
          .subscribe( () => {
            this.game.has_wish = false;
            this.baseAnalyticsService.trackEvent(`Wishlist Removed`, this.analyticsCategory, this.game.title);
          });

      } else {
        this.baseWishlistService.postWishlistItem(this.game.game_code)
          .pipe(finalize( () => this._loadingThumbs = false ))
          .subscribe( () => {
            this.game.has_wish = true;
            this.baseAnalyticsService.trackEvent(`Wishlist Added`, this.analyticsCategory, this.game.title);
          });
      }
    }
  }

  clickRecomendation(value: boolean) {
    if (this._loadingThumbs ) { return; }

    if (this.game.has_review) {
      toast('You can\'t change your vote on a game you have reviewed. Edit the review instead.', 2000);

    } else {
      this.game.recomends === value
        ? this.deleteRecomendation()
        : this.postRecomendation(value);
    }
  }

  postRecomendation(recomends: boolean) {
    this._loadingThumbs = true;
    const oldValue = this.game.recomends;
    this.game.recomends = null;

    this.baseRecomendationService.postRecomendation(recomends, this.game.game_code).subscribe(
      () => {
        this.game.recomends = recomends;
        this.game.has_wish = false;
        this._loadingThumbs = false;
        this.updateCount(oldValue, recomends);

        this.baseAnalyticsService.trackEvent(
          `${recomends ? 'Liked' : 'Disliked'}`,
          this.analyticsCategory,
          this.game.title
        );
      }, error => {
        console.log(error);
        this.game.recomends = oldValue;
        this._loadingThumbs = false;
      }
    );
  }

  deleteRecomendation() {
    this._loadingThumbs = true;
    const oldValue = this.game.recomends;
    this.game.recomends = null;

    this.baseRecomendationService.deleteRecomendation(this.game.game_code).subscribe(
      () => {
        this._loadingThumbs = false;
        this.updateCount(oldValue, null);

        this.baseAnalyticsService.trackEvent(
          `${oldValue ? 'Like' : 'Dislike'} Removed `,
          this.analyticsCategory,
          this.game.title
        );
      }, error => {
        console.log(error);
        this.game.recomends = oldValue;
        this._loadingThumbs = false;
      }
    );
  }

  /** Check whether the old and new values are true, false or null, and updates counters accordingly */
  updateCount(oldVal: boolean, newVal: boolean) {
    if (oldVal === true) {
      this.game.likes -= 1;
      this.game.dislikes += newVal === false ? 1 : 0;

    } else if (oldVal === false) {
      this.game.dislikes -= 1;
      this.game.likes += newVal === true ? 1 : 0;

    } else if (oldVal === null) {
      this.game.likes += newVal === true ? 1 : 0;
      this.game.dislikes += newVal === false ? 1 : 0;
    }
  }
}
