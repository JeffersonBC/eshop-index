import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';

import { GameListService } from '@services/game-list.service';


@Injectable()
export class GameListResolver implements Resolve<any> {

  constructor(
    private gameListService: GameListService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | any {

    return this.gameListService.getGameList(route.params['id']);
  }
}
