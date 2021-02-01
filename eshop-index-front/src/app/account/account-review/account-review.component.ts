import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ReviewForm } from '@models/classification.model';
import { GameModel } from '@models';
import { GameService } from '@services/game.service';


@Component({
  selector: 'app-account-review',
  templateUrl: './account-review.component.html',
  styleUrls: [],
})
export class AccountReviewComponent implements OnInit {

  game: GameModel;
  formInfo: ReviewForm = { recomends: null, review_text: '' };
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
  ) { }

  ngOnInit() {
    this.gameService.getGameByGameCode(this.route.snapshot.params['game_code'])
      .subscribe(response => this.game = response);

    if (this.route.snapshot.data['review']) {
      this.formInfo.review_text = this.route.snapshot.data['review']['review_text'];
      this.isEditing = true;
    }

    if (this.route.snapshot.data['recomendation']) {
      this.formInfo.recomends = this.route.snapshot.data['recomendation']['recomends'];
    }
  }

}
