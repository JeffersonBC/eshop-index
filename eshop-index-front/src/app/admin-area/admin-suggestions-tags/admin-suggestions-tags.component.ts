import { Component, OnInit } from '@angular/core';

import { map, finalize } from 'rxjs/operators';

import { SuggestedTags } from '@models';
import { TagService } from '@services/classification/tag.service';
import { doOnSubscribe } from '@shared/utils/observable-pipes.utils';


@Component({
  selector: 'app-admin-suggestions-tags',
  templateUrl: './admin-suggestions-tags.component.html',
  styleUrls: [
    './admin-suggestions-tags.component.scss',
    '../../shared/style/_admin-table.scss',
  ]
})
export class AdminSuggestionsTagsComponent implements OnInit {

  loading = false;
  ObjectKeys = Object.keys;

  suggestions: SuggestedTags = {};

  constructor(
    private readonly tagService: TagService,
  ) { }

  ngOnInit() {
    this.tagService.getUnconfirmedSuggestedAll()
      .pipe(map( response => { this.suggestions = response; return response; } ))
      .subscribe();
  }

  confirmTag(gameId: number, gameTitle: string, tagId: number, tagName: string) {
    if (confirm(`Are you SURE you want to confirm tag ${tagName} for the game ${gameTitle}?`)) {
      this.tagService.postTagConfirmOfGame(tagId, gameId)
        .pipe(
          doOnSubscribe( () => this.loading = true ),
          finalize( () => this.loading = false ),
        )
        .subscribe( () => delete(this.suggestions[gameId].tags[tagId]) );
    }
  }
}
