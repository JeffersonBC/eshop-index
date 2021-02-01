import { Component, OnInit } from '@angular/core';

import { finalize } from 'rxjs/operators';

import { TagsPerGroup, TagVotedModel, GameModel } from '@models';
import { TagService } from '@services/classification/tag.service';
import { AnalyticsService } from '@services/analytics.service';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '@services/game.service';
import { SEOService } from '@services/seo.service';


@Component({
  selector: 'app-game-vote-tag',
  templateUrl: './game-vote-tag.component.html',
  styleUrls: ['./game-vote-tag.component.scss']
})
export class GameVoteTagComponent implements OnInit {

  game: GameModel;
  tags: TagsPerGroup;
  votedTags: TagVotedModel;
  loadingTag: { [id: number]: boolean } = {};

  gameCode: string;

  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly gameService: GameService,
    private readonly route: ActivatedRoute,
    private readonly tagService: TagService,
    private readonly seoService: SEOService,
  ) { }

  ngOnInit() {
    this.gameCode = this.route.parent.snapshot.params['game_code'];

    this.gameService.getGameByGameCode(this.gameCode)
      .subscribe(data => {
        this.game = data;
        this.seoService.setTitle({windowTitle: this.game.title + ' | Vote for Tag'});
      });

    this.tagService.getTagsAllByVotableGroup()
      .subscribe(data => this.tags = data);

    this.votedTags = this.route.snapshot.data['votes'] as TagVotedModel;
  }

  clickTag(tagId: number) {
    this.loadingTag[tagId] = true;

    if (this.votedTags[tagId]) {
      this.tagService.deleteVoteTagByGame(tagId, this.gameCode)
        .pipe(finalize(() => this.loadingTag[tagId] = false ))
        .subscribe(() => {
          this.votedTags[tagId] = false;
          this.analyticsService.trackEvent(
            `Remove vote for tag ${ this.getTagByTagId(tagId).name }`,
            'Game - Vote for Tag',
            this.game.title,
          );
        });

    } else {
      this.tagService.postVoteTagByGame(tagId, this.gameCode)
        .pipe(finalize( () => this.loadingTag[tagId] = false ))
        .subscribe( () => {
          this.votedTags[tagId] = true;
          this.analyticsService.trackEvent(
            `Add vote for tag ${ this.getTagByTagId(tagId).name }`,
            'Game - Vote for Tag',
            this.game.title,
          );
        });
    }
  }

  getTagByTagId(tagId: number) {
    for (const key of Object.keys(this.tags)) {
      const foundTag = this.tags[key].find(tag => tag.id === tagId);
      if (foundTag) { return foundTag; }
    }

    return null;
  }
}
