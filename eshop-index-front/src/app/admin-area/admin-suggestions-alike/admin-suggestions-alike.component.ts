import { Component, OnInit } from '@angular/core';

import { map, finalize } from 'rxjs/operators';

import { SuggestedAlike } from '@models';
import { AlikeService } from '@services/classification/alike.service';
import { doOnSubscribe } from '@shared/utils/observable-pipes.utils';


@Component({
  selector: 'app-admin-suggestions-alike',
  templateUrl: './admin-suggestions-alike.component.html',
  styleUrls: [
    '../../shared/style/_admin-table.scss',
  ],
})
export class AdminSuggestionsAlikeComponent implements OnInit {

  loading = false;
  suggestions: SuggestedAlike[] = [];

  constructor(
    private readonly alikeService: AlikeService,
  ) { }

  ngOnInit() {
    this.alikeService.getUnconfirmedSuggestedAll()
    .pipe(map( response => { this.suggestions = response; return response; } ))
    .subscribe();
  }

  confirmAlike(game1Id: number, game1Title: string, game2Id: number, game2Title: string) {
    if (confirm(`Are you SURE you want to confirm game "${game1Title}" is similar to game "${game2Title}"?`)) {
      this.alikeService.postAlikeAdmin(game1Id, game2Id)
        .pipe(
          doOnSubscribe( () => this.loading = true ),
          finalize( () => this.loading = false ),
        )
        .subscribe( () => {
          const index1 = this.suggestions.findIndex(el => el.game1.id === game1Id && el.game2.id === game2Id);
          const index2 = this.suggestions.findIndex(el => el.game1.id === game2Id && el.game2.id === game1Id);

          this.suggestions.splice(index1, 1);
          this.suggestions.splice(index2 - 1, 1);
        });
    }
  }
}
