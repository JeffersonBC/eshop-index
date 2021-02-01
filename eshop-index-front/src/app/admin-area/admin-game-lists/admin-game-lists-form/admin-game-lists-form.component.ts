import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { finalize } from 'rxjs/operators';

import { GameListForm, TagsPerGroup } from '@models';
import { FormUtil } from '@shared/utils/form.util';
import { doOnSubscribe } from '@shared/utils/observable-pipes.utils';
import { FormService } from '@services/form.service';
import { GameService } from '@services/game.service';
import { GameListService } from '@services/game-list.service';
import { TagService } from '@services/classification/tag.service';


@Component({
  selector: 'app-admin-game-lists-form',
  templateUrl: './admin-game-lists-form.component.html',
  styleUrls: ['../../../shared/style/_tags_collapsible.scss'],
})
export class AdminGameListsFormComponent implements OnInit {

  _isEditing = false;
  _loading = false;
  _slotId = 0;
  _listId = 0;

  @ViewChild('form') form: NgForm;
  gameListForm: GameListForm = {} as GameListForm;
  allTagsByGroup: TagsPerGroup;

  listQueryForm = {
    tags: {},
    orderBy: '-date',
    releasedStatus: 'released',
    highlightsOnly: false,
    unratedOnly: false,
    qtd: 20,
    dateFrom: null,
    dateTo: null,
    priceFrom: '',
    priceTo: '',
    onSaleOnly: false,
    minDiscount: 0,
  };

  readonly objectKeys = Object.keys; // Declared so it can be used on the template


  constructor(
    public readonly formService: FormService,
    public readonly gameService: GameService,
    private readonly gameListService: GameListService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly tagService: TagService,
  ) { }

  ngOnInit() {
    this._slotId = this.route.snapshot.params['slotId'];

    this.tagService.getTagsAllByGroup()
      .subscribe((data: TagsPerGroup) => this.allTagsByGroup = data);

    if (this.route.snapshot.data['gameList']) {
      this.gameListForm = this.route.snapshot.data['gameList'] as GameListForm;
      this._listId = this.route.snapshot.params['id'];
      this._isEditing = true;
      this.loadJSONtoForm();
    } else {
      this.updateJSON();
    }
  }


  isValid(): boolean {
    FormUtil.touchForm(this.form.control);
    return this.form.valid;
  }

  send() {
    if (!this.isValid()) { return; }

    let observable$;
    this._isEditing ?
      observable$ = this.gameListService.patchGameList(this._listId, this.gameListForm) :
      observable$ = this.gameListService.postGameList(this._slotId, this.gameListForm);

    observable$
      .pipe(
        doOnSubscribe( () => this._loading = true ),
        finalize( () => this._loading = false ),
      )
      .subscribe( () => this.router.navigate(['/admin', 'game_lists']) );
  }

  delete() {
    if (confirm('Are you SURE you want to delete this list? This can\'t be undone.')) {
      this.gameListService.deleteGameList(this._listId)
        .subscribe( () => this.router.navigate(['/admin', 'game_lists']) );
    }
  }

  clickTag(tagId: number) {
    this.listQueryForm.tags[tagId]
      ? delete(this.listQueryForm.tags[tagId])
      : this.listQueryForm.tags[tagId] = true;

    this.updateJSON();
  }

  updateJSON() {
    const listJSON = {};

    if (Object.keys(this.listQueryForm.tags).length) {
      listJSON['tags'] = Object.keys(this.listQueryForm.tags).join(); }

    if (this.listQueryForm.orderBy) {
      listJSON['order_by'] = this.listQueryForm.orderBy; }

    if (this.listQueryForm.highlightsOnly === true) {
      listJSON['highlights_only'] = this.listQueryForm.highlightsOnly; }

    if (this.listQueryForm.unratedOnly === true) {
      listJSON['unrated_only'] = this.listQueryForm.unratedOnly; }

    if (this.listQueryForm.qtd) {
      listJSON['qtd'] = this.listQueryForm.qtd; }

    if (this.listQueryForm.priceFrom) {
      listJSON['price_from'] = this.listQueryForm.priceFrom; }

    if (this.listQueryForm.priceTo) {
      listJSON['price_to'] = this.listQueryForm.priceTo; }

    if (this.listQueryForm.onSaleOnly === true) {
      listJSON['sales_only'] = this.listQueryForm.onSaleOnly; }

    if (this.listQueryForm.minDiscount !== 0) {
      listJSON['min_discount'] = this.listQueryForm.minDiscount; }

    if (this.listQueryForm.releasedStatus) {
      listJSON['released_status'] = this.listQueryForm.releasedStatus;

      if (this.listQueryForm.releasedStatus === 'between') {
        if (this.listQueryForm.dateFrom) {
          listJSON['date_from'] = this.formService.dateAmericanToISO(this.listQueryForm.dateFrom);
        }
        if (this.listQueryForm.dateTo) {
          listJSON['date_to'] = this.formService.dateAmericanToISO(this.listQueryForm.dateTo);
        }
      }
    }

    this.gameListForm.query_json = JSON.stringify(listJSON);
  }

  loadJSONtoForm() {
    const listJSON = JSON.parse(this.gameListForm.query_json);

    if (listJSON.hasOwnProperty('order_by')) { this.listQueryForm.orderBy = listJSON.order_by; }
    if (listJSON.hasOwnProperty('highlights_only')) { this.listQueryForm.highlightsOnly = listJSON.highlights_only; }
    if (listJSON.hasOwnProperty('unrated_only')) { this.listQueryForm.unratedOnly = listJSON.unrated_only; }
    if (listJSON.hasOwnProperty('qtd')) { this.listQueryForm.qtd = listJSON.qtd; }
    if (listJSON.hasOwnProperty('price_from')) { this.listQueryForm.priceFrom = listJSON.price_from; }
    if (listJSON.hasOwnProperty('price_to')) { this.listQueryForm.priceTo = listJSON.price_to; }
    if (listJSON.hasOwnProperty('sales_only')) { this.listQueryForm.onSaleOnly = listJSON.sales_only; }
    if (listJSON.hasOwnProperty('min_discount')) { this.listQueryForm.minDiscount = listJSON.min_discount; }

    if (listJSON.hasOwnProperty('released_status')) {
      this.listQueryForm.releasedStatus = listJSON.released_status;

      if (listJSON.released_status === 'between') {
        if (listJSON.hasOwnProperty('date_from')) {
          this.listQueryForm.dateFrom = this.formService.dateISOtoAmerican(listJSON.date_from);
        }
        if (listJSON.hasOwnProperty('date_to')) {
          this.listQueryForm.dateTo = this.formService.dateISOtoAmerican(listJSON.date_to);
        }
      }
    }

    if (listJSON.hasOwnProperty('tags')) {
      for (const tagId of listJSON.tags.split(',')) {
        this.listQueryForm.tags[tagId] = true;
      }
    }
  }
}
