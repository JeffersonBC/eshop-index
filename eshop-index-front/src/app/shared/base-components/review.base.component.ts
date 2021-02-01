import { Input } from '@angular/core';

import { finalize } from 'rxjs/operators';

import { ReviewModel, GameModel } from '@models';
import { ReviewService } from '@services/classification/review.service';
import { AnalyticsService } from '@services/analytics.service';


export class ReviewBaseComponent {

  @Input() analyticsCategory = 'Review Card';
  @Input() game: GameModel;
  @Input() gameTitle = '';
  @Input() review: ReviewModel;

  _loadingThumbs = false;

  constructor(
    private readonly baseAnalyticsService: AnalyticsService,
    private readonly baseReviewService: ReviewService,
  ) { }

  clickUseful(vote: boolean) {
    this._loadingThumbs = true;

    if (this.review.vote === vote) {
      this.baseReviewService.deleteVoteReview(this.review.id)
        .pipe(finalize( () => this._loadingThumbs = false ))
        .subscribe(() => {
          this.updateCount(this.review.vote, null);
          this.review.vote = null;
          this.baseAnalyticsService.trackEvent(
            'Review removed vote',
            this.analyticsCategory,
            this.game ? this.game.title : this.gameTitle
          );
        });

    } else {
      this.baseReviewService.postVoteReview(vote, this.review.id)
        .pipe(finalize( () => this._loadingThumbs = false ))
        .subscribe(() => {
          this.updateCount(this.review.vote, vote);
          this.review.vote = vote;
          this.baseAnalyticsService.trackEvent(
            `Review ${vote ? '' : 'dis'}liked`,
            this.analyticsCategory,
            this.game ? this.game.title : this.gameTitle
          );
        });
    }
  }

  /** Check whether the old and new values are true, false or null, and updates counters accordingly */
  updateCount(oldVal: boolean, newVal: boolean) {
    if (oldVal === true) {
      this.review.useful -= 1;
      this.review.not_useful += newVal === false ? 1 : 0;

    } else if (oldVal === false) {
      this.review.not_useful -= 1;
      this.review.useful += newVal === true ? 1 : 0;

    } else if (oldVal === null) {
      this.review.useful += newVal === true ? 1 : 0;
      this.review.not_useful += newVal === false ? 1 : 0;
    }
  }
}
