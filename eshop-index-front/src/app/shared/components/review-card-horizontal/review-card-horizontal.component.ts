import { Component, Input } from '@angular/core';

import { ReviewService } from '@services/classification/review.service';
import { ReviewBaseComponent } from '@shared/base-components/review.base.component';
import { AnalyticsService } from '@services/analytics.service';


@Component({
  selector: 'app-review-card-horizontal',
  templateUrl: './review-card-horizontal.component.html',
  styleUrls: ['./review-card-horizontal.component.scss']
})
export class ReviewCardHorizontalComponent extends ReviewBaseComponent {

  @Input() user: string = null;

  constructor(
    private readonly reviewService: ReviewService,
    private readonly analyticsService: AnalyticsService,
  ) {
    super(analyticsService, reviewService);
  }
}
