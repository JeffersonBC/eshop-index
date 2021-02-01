import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { GameListSlot, GameListForm, GameListModel } from '@models';
import { Endpoints } from '@shared/utils/endpoints.util';
import { GameService } from '@services/game.service';


@Injectable({
  providedIn: 'root'
})
export class GameListService {

  constructor(
    private readonly http: HttpClient,
    private readonly gameService: GameService,
  ) { }

  /** SLOTS */
  getGameListSlotAdminAll(): Observable<GameListSlot> {
    return this.http.get(Endpoints.get(Endpoints.gameListSlotAdminAll)) as Observable<GameListSlot>;
  }

  postGameListAdminSlot() {
    return this.http.post(Endpoints.get(Endpoints.gameListSlotAdminPost), null);
  }

  deleteGameListAdminSlot(id: number) {
    return this.http.delete(Endpoints.get(Endpoints.gameListSlotAdminDelete, id));
  }

  postGameListAdminSlotOrder(slotId: number, to: 'up' | 'down') {
    return this.http.post(
      to === 'up' ?
        Endpoints.get(Endpoints.gameListSlotAdminOrderUp, slotId) :
        Endpoints.get(Endpoints.gameListSlotAdminOrderDown, slotId),
      null
    );
  }


  /** LISTS */
  getGameList(listId: number): Observable<GameListForm> {
    return this.http.get(Endpoints.get(Endpoints.gameList, listId)) as Observable<GameListForm>;
  }

  postGameList(slotId: number, gameList: GameListForm) {
    return this.http.post(Endpoints.get(Endpoints.gameListPost, slotId), gameList);
  }

  patchGameList(listId: number, gameList: GameListForm) {
    return this.http.patch(Endpoints.get(Endpoints.gameList, listId), gameList);
  }

  deleteGameList(listId: number) {
    return this.http.delete(Endpoints.get(Endpoints.gameList, listId));
  }

  getGameLists(): Observable<GameListModel[]> {
    return this.http.get(
      Endpoints.get(Endpoints.gameListsGet),
      { params: { 'country': this.gameService.country } },
    ) as Observable<GameListModel[]>;
  }
}
