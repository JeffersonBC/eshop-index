import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { RecomendationRequest, GameModel, ReviewModel } from '@models';
import { Endpoints } from '@shared/utils/endpoints.util';


@Injectable()
export class RecomendationService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  getRecomendation(gameCode: string) {
    return this.http.get(Endpoints.get('recomendation', gameCode));
  }

  postRecomendation(recomends: boolean, gameCode: string) {
    const requestBody: RecomendationRequest = { recomends: recomends };

    return this.http.post(Endpoints.get('recomendation', gameCode), requestBody);
  }

  deleteRecomendation(gameCode: string) {
    return this.http.delete(Endpoints.get('recomendation', gameCode));
  }

  getRecomendationsCurrentUser() {
    return this.http.get(Endpoints.get('recomendationsCurrentUser')) as Observable<{
      likes: { game: GameModel, review?: ReviewModel }[];
      dislikes: { game: GameModel, review?: ReviewModel }[]
    }>;
  }

  getRecomendationsAllCurrentUser(recomends: string): Observable<{ game: GameModel, review?: ReviewModel }[]> {
    return this.http.get(Endpoints.get(Endpoints.recomendationsCurrentUserAll, recomends)
      ) as Observable<{ game: GameModel, review?: ReviewModel }[]>;
  }

  getRecomendationsByUsername(username: string) {
    return this.http.get(Endpoints.get(Endpoints.recomendationsUser, username)) as Observable<{
      likes: { game: GameModel, review?: ReviewModel }[];
      dislikes: { game: GameModel, review?: ReviewModel }[]
    }>;
  }

  getRecomendationsAllByUsername(username: string, recomends: string): Observable<{ game: GameModel, review?: ReviewModel }[]> {
    return this.http.get(Endpoints.get(Endpoints.recomendationsUserAll, username, recomends)
      ) as Observable<{ game: GameModel, review?: ReviewModel }[]>;
  }

  postRecomendationHighlightAdmin(gameId: number) {
    return this.http.post(Endpoints.get('recomendationAdminConfirm', gameId), null);
  }

  deleteRecomendationHighlightAdmin(gameId: number) {
    return this.http.delete(Endpoints.get('recomendationAdminConfirm', gameId));
  }
}
