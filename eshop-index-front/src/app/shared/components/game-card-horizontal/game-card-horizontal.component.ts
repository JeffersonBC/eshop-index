import { Component, Input } from '@angular/core';

import { ReviewBaseComponent } from '@shared/base-components/review.base.component';
import { ReviewService } from '@services/classification/review.service';
import { AnalyticsService } from '@services/analytics.service';


@Component({
  selector: 'app-game-card-horizontal',
  templateUrl: './game-card-horizontal.component.html',
  styleUrls: ['./game-card-horizontal.component.scss']
})
export class GameCardHorizontalComponent extends ReviewBaseComponent {

  @Input() autoImgWidth = false;

  constructor (
    private readonly reviewService: ReviewService,
    private readonly analyticsService: AnalyticsService,
  ) {
    super(analyticsService, reviewService);
  }
}
