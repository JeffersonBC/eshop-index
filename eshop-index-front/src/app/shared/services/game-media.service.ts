import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { GameMedia } from '@models';
import { Endpoints } from '@shared/utils/endpoints.util';


@Injectable()
export class GameMediaService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  getGameMediaAllByGameCode(gameCode: string): Observable<GameMedia[]> {
    return this.http.get(Endpoints.get(Endpoints.gameMediaAllByGameCode, gameCode)) as Observable<GameMedia[]>;
  }

  getGameMediaAllByGameId(gameId: number): Observable<GameMedia[]> {
    return this.http.get(Endpoints.get(Endpoints.gameMediaAllByGameId, gameId)) as Observable<GameMedia[]>;
  }

  postGameMedia(mediaForm: GameMedia, gameId: number) {
    return this.http.post(Endpoints.get(Endpoints.gameMediaPost, gameId), mediaForm);
  }

  getGameMedia(mediaId: number): Observable<GameMedia> {
    return this.http.get(Endpoints.get(Endpoints.gameMedia, mediaId)) as Observable<GameMedia>;
  }

  patchGameMedia(mediaForm: GameMedia, mediaId: number) {
    return this.http.patch(Endpoints.get(Endpoints.gameMedia, mediaId), mediaForm);
  }

  deleteGameMedia(mediaId: number) {
    return this.http.delete(Endpoints.get(Endpoints.gameMedia, mediaId));
  }

  postGameMediaOrder(mediaId: number, direction: 'up' | 'down') {
    if (direction === 'up') {
      return this.http.post(Endpoints.get(Endpoints.gameMediaOrderUp, mediaId), null);

    } else {
      return this.http.post(Endpoints.get(Endpoints.gameMediaOrderDown, mediaId), null);
    }
  }
}
