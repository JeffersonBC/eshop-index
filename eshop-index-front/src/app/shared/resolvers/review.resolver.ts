import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { ReviewService } from '@services/classification/review.service';


@Injectable()
export class ReviewResolver implements Resolve<any> {
  constructor(
    private reviewService: ReviewService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | any {

    return this.reviewService.getReview(route.params['game_code']);
  }
}
