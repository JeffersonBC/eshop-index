import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ReviewModel, GameModel } from '@models';
import { ReviewService } from '@services/classification/review.service';
import { GameService } from '@services/game.service';
import { SEOService } from '@services/seo.service';


@Component({
  selector: 'app-game-reviews-all',
  templateUrl: './game-reviews-all.component.html',
  styleUrls: ['./game-reviews-all.component.scss']
})
export class GameReviewsAllComponent implements OnInit {

  game: GameModel;
  reviews: ReviewModel[];
  _gameCode: string;

  // Pagination variables
  pages: number[] = [];
  reviewsCurrentPage: ReviewModel[];
  reviewsPerPage = 16;
  currentPage = 1;


  constructor(
    private readonly gameService: GameService,
    private readonly reviewService: ReviewService,
    private readonly route: ActivatedRoute,
    private readonly seoService: SEOService,
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this._gameCode = params['game_code'];

      this.gameService.getGameByGameCode(this._gameCode)
        .subscribe(data => {
          this.game = data;
          this.seoService.setTitle({windowTitle: this.game.title + ' | Reviews '});
        });

      this.reviewService.getReviewsAll(this._gameCode)
        .subscribe(response => {
          this.reviews = response;
          this.updatePages();
        });
    });
  }

  updatePages() {
    this.pages = [];
    this.reviewsCurrentPage = [];

    for (let i = 1; i <= ((this.reviews.length - 1) / this.reviewsPerPage) + 1; i++) {
      this.pages.push(i);
    }

    this.goToPage(1);
  }

  goToPage(pageNumber: number) {
    if (pageNumber <= 0 || pageNumber > this.pages.length) { return; }

    this.currentPage = pageNumber;
    this.reviewsCurrentPage = this.reviews.slice(
      (pageNumber - 1) * this.reviewsPerPage,
      (pageNumber - 1) * this.reviewsPerPage + this.reviewsPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.goToPage(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
      this.goToPage(this.currentPage);
    }
  }

}
