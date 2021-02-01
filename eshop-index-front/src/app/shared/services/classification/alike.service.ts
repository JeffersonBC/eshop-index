import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { GameSelectIdModel, GameModel, SuggestedAlike } from '@models';
import { Endpoints } from '@shared/utils/endpoints.util';
import { GameService } from '@services/game.service';


@Injectable()
export class AlikeService {

  constructor(
    private readonly http: HttpClient,
    private readonly gameService: GameService,
  ) { }

  // All
  getAlikeByGame(game1_code: string): Observable<GameModel[]> {
    return this.http.get(Endpoints.get(
      Endpoints.alikeConfirmedAll, game1_code),
      { params: { 'country': this.gameService.country } },
    ) as Observable<GameModel[]>;
  }


  // User
  getVotedByGame(game1_code: string): Observable<GameSelectIdModel[]> {
    return this.http.get(Endpoints.get(
      Endpoints.alikeVotedAll, game1_code)) as Observable<GameSelectIdModel[]>;
  }

  postVoteAlike(game1_code: string, game2_code: string) {
    return this.http.post(Endpoints.get(
      Endpoints.alikeVote, game1_code, game2_code), null);
  }

  deleteVoteAlike(game1_code: string, game2_code: string) {
    return this.http.delete(Endpoints.get(
      Endpoints.alikeVote, game1_code, game2_code));
  }


  // Admin
  getAlikeAdminByGame(game1_id: number): Observable<GameSelectIdModel[]> {
    return this.http.get(Endpoints.get(
      Endpoints.alikeConfirmedAllStaff, game1_id)) as Observable<GameSelectIdModel[]>;
  }

  postAlikeAdmin(game1_id: number, game2_id: number) {
    return this.http.post(Endpoints.get(
      Endpoints.alikeAdmin, game1_id, game2_id), null);
  }

  deleteAlikeAdmin(game1_id: number, game2_id: number) {
    return this.http.delete(Endpoints.get(
      Endpoints.alikeAdmin, game1_id, game2_id));
  }


  // Suggestions
  getUnconfirmedSuggestedAll(): Observable<SuggestedAlike[]> {
    return this.http.get(Endpoints.get(Endpoints.alikeUnconfirmedSuggestedAll)) as Observable<SuggestedAlike[]>;
  }
}
