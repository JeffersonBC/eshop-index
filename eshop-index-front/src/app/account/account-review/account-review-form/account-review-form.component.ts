import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { finalize } from 'rxjs/operators';

import { GameModel } from '@models';
import { ReviewModel } from '@models/classification.model';
import { ReviewService } from '@services/classification/review.service';
import { AnalyticsService } from '@services/analytics.service';
import { FormUtil } from '@shared/utils/form.util';


@Component({
  selector: 'app-account-review-form',
  templateUrl: './account-review-form.component.html',
  styleUrls: ['./account-review-form.component.scss']
})
export class AccountReviewFormComponent {

  @ViewChild('form') form: NgForm;
  @Input() formInfo: ReviewModel;
  @Input() isEditing: boolean;
  @Input() game: GameModel;

  _loading = false;

  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly reviewService: ReviewService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) { }

  isValid(): boolean {
    FormUtil.touchForm(this.form.control);
    return this.form.valid;
  }

  send() {
    if (this.isValid()) {
      this._loading = true;

      this.reviewService.postReview(this.formInfo, this.route.snapshot.params['game_code'])
        .pipe(finalize( () => this._loading = false ))
        .subscribe(() => {
          this.router.navigate(['account']);
          this.analyticsService.trackEvent(
            this.isEditing ? 'Update Review' : 'Send Review',
            'Review',
            this.game.title
          );
        });
    }
  }

  delete() {
    this._loading = true;

    this.reviewService.deleteReview(this.route.snapshot.params['game_code'])
      .pipe(finalize( () => this._loading = false ))
      .subscribe(() => {
        this.router.navigate(['account']);
        this.analyticsService.trackEvent('Delete Review', 'Review', this.game.title);
      });
  }
}
