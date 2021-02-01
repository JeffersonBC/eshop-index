import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { finalize } from 'rxjs/operators';

import { TagsPerGroup, GameModel, TagConfirmedModel } from '@models';
import { TagService } from '@services/classification/tag.service';
import { GameService } from '@services/game.service';
import { doOnSubscribe } from '@shared/utils/observable-pipes.utils';


@Component({
  selector: 'app-admin-games-tags',
  templateUrl: './admin-games-tags.component.html',
  styleUrls: ['./admin-games-tags.component.scss']
})
export class AdminGamesTagsComponent implements OnInit {

  game: GameModel;
  tags: TagsPerGroup;
  confirmedTags: TagConfirmedModel;
  loadingTag: { [id: number]: boolean } = {};

  private gameId: number;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly gameService: GameService,
    private readonly tagService: TagService,
  ) { }

  ngOnInit() {
    this.gameId = this.route.snapshot.params['id'];

    this.gameService.getGameSimpleById(this.gameId)
      .subscribe( data => this.game = data );

    this.tagService.getTagsAllByGroup()
      .subscribe((data: TagsPerGroup) => this.tags = data);

    this.tagService.getTagsConfirmedByGame(this.gameId)
      .subscribe(data => {
        this.confirmedTags = {} as TagConfirmedModel;
        this.confirmedTags.nintendo = data['nintendo'] as { [id: number]: boolean };
        this.confirmedTags.staff = data['staff'] as { [id: number]: boolean };
      });
  }

  clickTag(tagId: number) {
    this.loadingTag[tagId] = true;

    if (this.confirmedTags.staff[tagId]) {
      this.tagService.deleteTagConfirmOfGame(tagId, this.gameId)
        .pipe(finalize( () => this.loadingTag[tagId] = false ))
        .subscribe( () => this.confirmedTags.staff[tagId] = false );

    } else {
      this.tagService.postTagConfirmOfGame(tagId, this.gameId)
        .pipe(finalize( () => this.loadingTag[tagId] = false ))
        .subscribe( () => this.confirmedTags.staff[tagId] = true );
    }
  }

  unconfirmNintedoTag(tagId: number) {
    if (confirm('Are you SURE you want to remove this tag confirmation by Nintendo? This can\'t be undone')) {
      this.tagService.deleteTagConfirmNintendOfGame(tagId, this.gameId)
        .pipe(
          doOnSubscribe( () => this.loadingTag[tagId] = true ),
          finalize( () => this.loadingTag[tagId] = false ),
        ).subscribe( () => this.confirmedTags.nintendo[tagId] = false );
    }
  }
}
