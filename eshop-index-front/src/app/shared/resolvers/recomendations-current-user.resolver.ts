import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { RecomendationService } from '@services/classification/recomendation.service';


@Injectable()
export class RecomendationsCurrentUserResolver implements Resolve<any> {
  constructor(
    private recomendationService: RecomendationService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | any {

    return this.recomendationService.getRecomendationsAllCurrentUser(route.data['recomends']);
  }
}
