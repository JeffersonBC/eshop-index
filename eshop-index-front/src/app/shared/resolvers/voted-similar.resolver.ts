import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { AlikeService } from '@services/classification/alike.service';


@Injectable()
export class VotedSimilarResolver implements Resolve<any> {
  constructor(
    private alikeService: AlikeService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | any {

    return this.alikeService.getVotedByGame(
      route.parent.params['game_code']);
  }
}
