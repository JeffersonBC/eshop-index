import { Component, OnInit } from '@angular/core';

import { map, finalize } from 'rxjs/operators';

import { GameListService } from '@services/game-list.service';
import { doOnSubscribe } from '@utils/observable-pipes.utils';
import { GameListSlot } from '@models';


@Component({
  selector: 'app-admin-game-lists',
  templateUrl: './admin-game-lists.component.html',
  styleUrls: ['./admin-game-lists.component.scss']
})
export class AdminGameListsComponent implements OnInit {

  _loading = true;

  slots$;
  slots: GameListSlot;

  constructor(
    private readonly gameListService: GameListService,
  ) { }

  ngOnInit() {
    this.slots$ = this.gameListService.getGameListSlotAdminAll()
      .pipe(
        doOnSubscribe(() => this._loading = true),
        finalize(() => this._loading = false),
        map(data => this.slots = data)
      );

    this.slots$.subscribe();
  }

  newSlot() {
    this.gameListService.postGameListAdminSlot().subscribe(() => this.slots$.subscribe());
  }

  deleteSlot(slotId: number) {
    if (confirm('Are you SURE you want to delete this slot? This can\'t be undone')) {
      this.gameListService.deleteGameListAdminSlot(slotId).subscribe(() => this.slots$.subscribe());
    }
  }

  slotOrder(slotId: number, to: 'up' | 'down') {
    this.gameListService.postGameListAdminSlotOrder(slotId, to).subscribe(() => this.slots$.subscribe());
  }

}
