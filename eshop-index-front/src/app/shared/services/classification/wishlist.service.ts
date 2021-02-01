import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { GameModel } from '@models';
import { Endpoints } from '@shared/utils/endpoints.util';
import { GameService } from '@services/game.service';


@Injectable()
export class WishlistService {

  constructor(
    private readonly gameService: GameService,
    private readonly http: HttpClient,
  ) { }

  getWishlist(): Observable<GameModel[]> {
    return this.http.get(
      Endpoints.get(Endpoints.wishlist),
      { params: { 'country': this.gameService.country } },
    ) as Observable<GameModel[]>;
  }

  postWishlistItem(game_code: string) {
    return this.http.post(Endpoints.get(Endpoints.wishlistItem, game_code), null);
  }

  deleteWishlistItem(game_code: string) {
    return this.http.delete(Endpoints.get(Endpoints.wishlistItem, game_code));
  }
}
