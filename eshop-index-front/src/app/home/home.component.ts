import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { GameModel, GameListModel } from '@models';
import { GameService } from '@services/game.service';
import { LoginEmitService } from '@services/login-emit.service';
import { GameListService } from '@services/game-list.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  _loggedIn = false;

  gameListsFromSlots$: Observable<void>;
  gameListsFromSlots: GameListModel[];
  loadedFromSlots = false;

  // "Recomended by people you follow" variables
  gameListRecomendedFollowing$: Observable<void>;
  gameListRecomendedFollowing: GameModel[];
  loadedRecomendedFollowing = false;

  // "Random tag" variables
  gameListRandomTag$: Observable<void>;
  gameListRandomTag: GameModel[];
  randomTagTitle: string;

  // "Liked tag" variables
  gameListLikedTag$: Observable<void>;
  gameListLikedTag: GameModel[];
  likedTagTitle: string;
  userNotLikedGameWithTag = true;

  // "Similar games" variables
  gameListSimilarLiked$: Observable<void>;
  gameListSimilarLiked: GameModel[];
  similarGameTitle: string;
  userNotLikedGameWithSimilar = true;


  constructor(
    private readonly gameService: GameService,
    private readonly gameListService: GameListService,
    private readonly loginEmitService: LoginEmitService,
  ) { }

  ngOnInit() {
    this.gameService.emitCountryChange$.subscribe( () => this.resetLists(false) );

    this.resetLists(true);
  }

  resetLists(firstTime: boolean) {
    this.gameListsFromSlots$ = this.gameListService.getGameLists()
      .pipe(map( response => {
        this.gameListsFromSlots = response;
        this.loadedFromSlots = true;
      }));

    if (this.loginEmitService.checkCurrentStatusLogin()) {
      this._loggedIn = true;

      this.gameListRecomendedFollowing$ = this.gameService.getGamesRecomendedFollowing(20, 0)
        .pipe(map( response => {
          this.gameListRecomendedFollowing = response;
          this.loadedRecomendedFollowing = true;
        }));

      this.gameListLikedTag$ = this.gameService.getGamesByRandomLikedTag(20, 0)
        .pipe(
          catchError((err, caught) => {
            return of({
              tag: '...',
              games: [],
            });
          }),
          map( response => {
            this.gameListLikedTag = response.games;
            this.likedTagTitle = response.tag;
            this.userNotLikedGameWithTag = false;
          }));

      this.gameListSimilarLiked$ = this.gameService.getGamesAlikeRecomended(20, 0)
        .pipe(
          catchError((err, caught) => {
            return of({
              game_title: '...',
              games: [],
            });
          }),
          map( response => {
            this.gameListSimilarLiked = response.games;
            this.similarGameTitle = response.game_title;
            this.userNotLikedGameWithSimilar = false;
          }));

    } else {
      this.gameListRandomTag$ = this.gameService.getGamesByRandomTag(20, 0)
        .pipe(map( response => {
          this.gameListRandomTag = response.games;
          this.randomTagTitle = response.tag;
        }));

    }

    if (!firstTime) {
      this.loadedFromSlots = false;
      this.gameListsFromSlots = [];
      this.gameListsFromSlots$.subscribe();
    }
  }
}
