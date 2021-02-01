import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { finalize } from 'rxjs/operators';

import { TagsPerGroup, GameModel, GameSearchForm } from '@models';
import { TagService } from '@services/classification/tag.service';
import { AnalyticsService } from '@services/analytics.service';
import { GameService } from '@services/game.service';
import { FormService } from '@services/form.service';
import { LoginEmitService } from '@services/login-emit.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [
    './search.component.scss',
    '../shared/style/_tags_collapsible.scss',
  ],
})
export class SearchComponent implements OnInit {

  searchResults: GameModel[];
  _searchedOnce = false;
  _loading = false;

  allTagsByGroup: TagsPerGroup;

  searchForm: GameSearchForm = {
    searchText: '',
    tags: {},
    orderBy: '-date',
    releaseStatus: 'released',
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

  readonly gamesPerPage = 16;
  readonly objectKeys = Object.keys; // Declared so it can be used on the template


  constructor(
    public readonly formService: FormService,
    public readonly gameService: GameService,
    public readonly loginEmitService: LoginEmitService,
    private readonly analyticsService: AnalyticsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly tagService: TagService,
  ) { }

  ngOnInit() {
    // If URL already has search query params
    if (Object.keys(this.route.snapshot.queryParams).length) {
      this.searchForm = this.gameService
        .queryParamsToGameSearchForm(this.route.snapshot.queryParams);

      this.search();
    }

    // Initialize tags
    this.tagService.getTagsAllBySearcheableGroup()
      .subscribe(response => this.allTagsByGroup = response);

    // Update search if changed country
    this.gameService.emitCountryChange$
      .subscribe( () => { if (this._searchedOnce) { this.search(); } });
  }

  clickTag(tagId: number) {
    this.searchForm.tags[tagId]
      ? delete(this.searchForm.tags[tagId])
      : this.searchForm.tags[tagId] = true;
  }

  search() {
    this._searchedOnce = true;
    this._loading = true;
    this.searchResults = null;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.gameService.gameSearchFormToQueryParams(this.searchForm),
    });

    if (this.searchForm.pages > 16) { this.searchForm.pages = 16; }
    if (this.searchForm.pages <  1) { this.searchForm.pages =  1; }

    this.gameService.getGamesSearch(this.searchForm.pages * this.gamesPerPage, 0, this.searchForm)
      .pipe(finalize( () => this._loading = false ))
      .subscribe( response => {
        this.searchResults = response;
        this.analyticsService.trackEvent(this.analyticsActionString(), 'Search');
      });
  }

  analyticsActionString(): string {
    let analyticsAction = '';
    if (this.searchForm.searchText) {
      analyticsAction += `"${this.searchForm.searchText}"`;
    }
    if (this.searchForm.tags) {
      analyticsAction += `${analyticsAction ? ' - ' : '' }` +
        `Tags: ${Object.keys(this.searchForm.tags).join()}`;
    }
    if (this.searchForm.highlightsOnly) {
      analyticsAction += `${analyticsAction ? ' - ' : '' }Highlights`;
    }
    if (['released', 'unreleased'].includes(this.searchForm.releaseStatus)) {
      analyticsAction += `${analyticsAction ? ' - ' : '' }` +
        `${this.searchForm.releaseStatus === 'released' ? 'Released' : 'Unreleased'}`;
    }
    if (this.searchForm.orderBy) {
      analyticsAction += `${analyticsAction ? ' - ' : '' }` +
        `${this.gameService.orderByValues[this.searchForm.orderBy]}`;
    }
    analyticsAction += `${analyticsAction ? ' - ' : '' }${this.searchForm.pages}`;

    return analyticsAction;
  }

}
