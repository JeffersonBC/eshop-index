import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import {
  GameModel,
  GameSearchForm,
  GameSelectGameCodeModel,
  GameSelectIdModel,
  GamePrices,
} from '@models';

import { Endpoints } from '@shared/utils/endpoints.util';
import { FormService } from '@services/form.service';


@Injectable()
export class GameService {

  private _country = 'US';

  public get country() { return this._country; }

  public set country (country: string) {
    localStorage.setItem('country', country);
    if (this._country !== country) {
      this._country = country;
      this.emitCountryChange.next();
    }
  }

  private readonly emitCountryChange = new Subject<void>();
  public readonly emitCountryChange$ = this.emitCountryChange.asObservable();

  readonly orderByValues: { [key: string]: string } = {
    '-date': 'Newest',
    'date': 'Oldest',
    '-vote_sum': 'Highest score',
    'vote_sum': 'Lowest score',
    'game_title': 'Alphabetical order',
    '-game_title': 'Alphabetical reverse order',
    'current_price': 'Lowest price',
    '-current_price': 'Highest price',
    '-discount_percent': 'Highest discount',
    '-rank': 'Best text match',
  };

  constructor(
    private readonly http: HttpClient,
    private readonly formService: FormService,
  ) {
    const c = localStorage.getItem('country');
    if (c) { this._country = c; }
  }

  getGameByGameCode(gameCode: string): Observable<GameModel> {
    return this.http.get(
      Endpoints.get('gameByCode', gameCode)) as Observable<GameModel>;
  }


  // QUERIES
  gameSearchFormToQueryParams(searchForm: GameSearchForm): { [key: string]: string } {
    const params: { [key: string]: string } = {};

    if (searchForm.searchText) { params['text'] = searchForm.searchText; }
    if (Object.keys(searchForm.tags).length) { params['tags'] = Object.keys(searchForm.tags).join(); }
    if (searchForm.orderBy) { params['order_by'] = searchForm.orderBy; }

    if (searchForm.releaseStatus) { params['released'] = searchForm.releaseStatus; }
    if (searchForm.dateFrom) { params['date_from'] = this.formService.dateAmericanToISO(searchForm.dateFrom); }
    if (searchForm.dateTo) { params['date_to'] = this.formService.dateAmericanToISO(searchForm.dateTo); }

    if (searchForm.highlightsOnly) { params['highlights_only'] = searchForm.highlightsOnly.toString(); }
    if (searchForm.unratedOnly) { params['unrated_only'] = searchForm.unratedOnly.toString(); }

    if (searchForm.priceFrom) { params['price_from'] = searchForm.priceFrom; }
    if (searchForm.priceTo) { params['price_to'] = searchForm.priceTo; }
    if (searchForm.onSaleOnly) { params['sales_only'] = searchForm.onSaleOnly.toString(); }
    if (searchForm.minDiscount) { params['min_discount'] = searchForm.minDiscount.toString(); }

    if (searchForm.pages > 16) {
      searchForm.pages = 16;
    } else if (searchForm.pages < 1) {
      searchForm.pages = 1;
    }
    if (searchForm.pages !== 8) { params['pages'] = searchForm.pages.toString(); }

    return params;
  }

  queryParamsToGameSearchForm(params: { [key: string]: string }): GameSearchForm {
    const searchForm: GameSearchForm = {
      searchText: '',
      tags: {},
      orderBy: '-date',
      releaseStatus: '',
      highlightsOnly: false,
      unratedOnly: false,
      pages: 8,
      dateFrom: '',
      dateTo: '',
      priceFrom: '',
      priceTo: '',
      onSaleOnly: false,
      minDiscount: 0,
    };

    if (params['text']) { searchForm.searchText = params['text']; }
    if (params['order_by']) { searchForm.orderBy = params['order_by']; }

    if (params['released']) { searchForm.releaseStatus = params['released']; }
    if (params['date_from']) { searchForm.dateFrom = this.formService.dateISOtoAmerican(params['date_from']); }
    if (params['date_to']) { searchForm.dateTo = this.formService.dateISOtoAmerican(params['date_to']); }

    if (params['highlights_only']) { searchForm.highlightsOnly = params['highlights_only'] === 'true'; }
    if (params['unrated_only']) { searchForm.unratedOnly = params['unrated_only'] === 'true'; }
    if (params['pages']) { searchForm.pages = parseInt(params['pages'], 10); }

    if (params['price_from']) { searchForm.priceFrom = params['price_from']; }
    if (params['price_to']) { searchForm.priceTo = params['price_to']; }
    if (params['sales_only']) { searchForm.onSaleOnly = params['sales_only'] === 'true'; }
    if (params['min_discount']) { searchForm.minDiscount = parseInt(params['min_discount'], 10); }

    if (params['tags']) {
      for (const tagId of params['tags'].split(',')) {
        searchForm.tags[tagId] = true;
      }
    }

    return searchForm;
  }

  // GAME LISTS
  getGamesSearch(quantity: number, offset: number, searchForm: GameSearchForm)
      : Observable<GameModel[]> {
    const params = {
      'qtd': quantity.toString(),
      'offset': offset.toString(),
      'country': this._country,
      ...this.gameSearchFormToQueryParams(searchForm)
    };

    return this.http.get(
      Endpoints.get(Endpoints.gamesAllSearch),
      { params }) as Observable<GameModel[]>;
  }

  getGamesAlikeRecomended(quantity: number, offset: number):
      Observable<{ game_title: string, games: GameModel[] }> {
    return this.http.get(
      Endpoints.get(Endpoints.gamesAlikeRecomended),
      { params: {
        'qtd': quantity.toString(),
        'offset': offset.toString(),
        'country': this._country,
      } }
    ) as Observable<{game_title: string, games: GameModel[]}>;
  }

  getGamesByRandomLikedTag(quantity: number, offset: number):
      Observable<{ tag: string, games: GameModel[]} > {
    return this.http.get(
      Endpoints.get(Endpoints.gamesByLikedTag),
      { params: {
        'qtd': quantity.toString(),
        'offset': offset.toString(),
        'country': this._country,
      } }
    ) as Observable<{tag: string, games: GameModel[]}>;
  }

  getGamesByRandomTag(quantity: number, offset: number):
      Observable<{ tag: string, games: GameModel[] }> {
    return this.http.get(
      Endpoints.get(Endpoints.gamesByRandomTag),
      { params: {
        'qtd': quantity.toString(),
        'offset': offset.toString(),
        'country': this._country,
      } }
    ) as Observable<{ tag: string, games: GameModel[] }>;
  }

  // getGamesByTag(tag: string, quantity: number, offset: number): Observable<GameModel[]> {
  //   return this.http.get(
  //     Endpoints.get(Endpoints.gamesByTag, tag),
  //     { params: { 'qtd': quantity.toString(), 'offset': offset.toString() } }
  //   ) as Observable<GameModel[]>;
  // }

  getGamesRecomendedFollowing(quantity: number, offset: number): Observable<GameModel[]> {
    return this.http.get(
      Endpoints.get(Endpoints.gamesRecomendedFollowing),
      { params: {
        'qtd': quantity.toString(),
        'offset': offset.toString(),
        'country': this._country,
      } }
    ) as Observable<GameModel[]>;
  }


  // ADMIN AREA
  getGameSimpleById(gameId: number): Observable<GameModel> {
    return this.http.get(
      Endpoints.get(Endpoints.gameSimpleById, gameId)) as Observable<GameModel>;
  }

  getGamesAdminAll() {
    return this.http.get(
      Endpoints.get(Endpoints.gamesAdminAll));
  }

  getGamesAllSelectId(): Observable<GameSelectIdModel[]> {
    return this.http.get(
      Endpoints.get(Endpoints.gamesAllSelectID)) as Observable<GameSelectIdModel[]>;
  }

  getGamesAllSelectGameCode(): Observable<GameSelectGameCodeModel[]> {
    return this.http.get(
      Endpoints.get(Endpoints.gamesAllSelectGameCode)) as Observable<GameSelectGameCodeModel[]>;
  }

  postGameHide(gameId: number) {
    return this.http.post(Endpoints.get(Endpoints.gameAdminHide, gameId), null);
  }

  deleteGameHide(gameId: number) {
    return this.http.delete(Endpoints.get(Endpoints.gameAdminHide, gameId));
  }

  postGameMerge(game1Id: number, game2Id: number) {
    return this.http.post(Endpoints.get(Endpoints.gameAdminMerge, game1Id, game2Id), null);
  }

  getPriceAllByGameCode(gameCode: string): Observable<GamePrices> {
    return this.http.get(Endpoints.get(
      Endpoints.gamePriceAllByGameCode, gameCode)) as Observable<GamePrices>;
  }
}
