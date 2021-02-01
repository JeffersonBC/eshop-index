import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { GameMediaService } from '@services/game-media.service';


@Injectable()
export class GameMediaResolver implements Resolve<any> {

  constructor(
    private gameMediaService: GameMediaService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | any {

    return this.gameMediaService.getGameMedia(route.params['id']);
  }
}
