import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GameModel, ReviewModel, GameMedia, TagsPerGroup } from '@models';
import { AlikeService } from '@services/classification/alike.service';
import { GameService } from '@services/game.service';
import { GameMediaService } from '@services/game-media.service';
import { ReviewService } from '@services/classification/review.service';
import { SEOService } from '@services/seo.service';
import { TagService } from '@services/classification/tag.service';
import { doOnSubscribe } from '@shared/utils/observable-pipes.utils';


@Component({
  selector: 'app-game-home',
  templateUrl: './game-home.component.html',
  styleUrls: ['./game-home.component.scss']
})
export class GameHomeComponent implements OnInit {

  game: GameModel;

  gameMedia: GameMedia[];
  gameMedia$: Observable<GameMedia[]>;
  gameMediaSubscribed = false;

  similarGames: GameModel[];
  similarGames$: Observable<GameModel[]>;
  similarGamesSubscribed = false;

  tags: TagsPerGroup;
  tags$: Observable<TagsPerGroup>;
  tagsSubscribed = false;

  reviews: ReviewModel[];
  reviews$: Observable<ReviewModel[]>;
  reviewsSubscribed = false;


  _gameCode: string;
  _tagsLength = 0;

  constructor(
    private readonly alikeService: AlikeService,
    private readonly gameService: GameService,
    private readonly gameMediaService: GameMediaService,
    private readonly reviewService: ReviewService,
    private readonly route: ActivatedRoute,
    private readonly seoService: SEOService,
    private readonly tagService: TagService,
  ) { }

  ngOnInit() {
    // Update if game changed
    this.route.params.subscribe(params => {
      this._gameCode = params['game_code'];

      this.initializeObservables(this._gameCode);
      this.reSubscribe();
    });

    // Update if country changed
    this.gameService.emitCountryChange$.subscribe(() => {
      this.similarGames = null;

      this.similarGames$ = this.alikeService.getAlikeByGame(this._gameCode).pipe(
        doOnSubscribe( () => this.similarGamesSubscribed = true ),
        map( response => this.similarGames = response ));

      if (this.similarGamesSubscribed) { this.similarGames$.subscribe(); }
    });
  }

  initializeObservables(gameCode) {
    this.gameService.getGameByGameCode(this._gameCode)
      .subscribe(response => {
        this.game = response;
        this.seoService.setTitle({windowTitle: this.game.title});
      });

    this.gameMedia$ = this.gameMediaService.getGameMediaAllByGameCode(this._gameCode)
      .pipe(
        doOnSubscribe( () => this.gameMediaSubscribed = true ),
        map( response => this.gameMedia = response )
      );

    this.similarGames$ = this.alikeService.getAlikeByGame(this._gameCode)
      .pipe(
        doOnSubscribe( () => this.similarGamesSubscribed = true ),
        map( response => this.similarGames = response )
      );

    this.tags$ = this.tagService.getTagsAllByGame(this._gameCode)
      .pipe(
        doOnSubscribe( () => this.tagsSubscribed = true ),
        map( response => {
          this.tags = response;
          this._tagsLength = Object.keys(this.tags).length;
          return response;
        })
      );

    this.reviews$ = this.reviewService.getReviewsAll(this._gameCode, 16)
      .pipe(
        doOnSubscribe( () => this.reviewsSubscribed = true ),
        map( response => this.reviews = response )
      );
  }

  reSubscribe() {
    if (this.gameMediaSubscribed) { this.gameMedia$.subscribe(); }
    if (this.similarGamesSubscribed) { this.similarGames$.subscribe(); }
    if (this.tagsSubscribed) { this.tags$.subscribe(); }
    if (this.reviewsSubscribed) { this.reviews$.subscribe(); }
  }
}
