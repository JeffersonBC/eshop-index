import { Component, OnInit } from '@angular/core';

import { GameModel, ReviewModel } from '@models';
import { ActivatedRoute } from '@angular/router';
import { RecomendationService } from '@services/classification/recomendation.service';


@Component({
  selector: 'app-user-profile-recomendations',
  templateUrl: './user-profile-recomendations.component.html',
  styleUrls: ['./user-profile-recomendations.component.scss']
})
export class UserProfileRecomendationsComponent implements OnInit {

  recomendations: { game: GameModel, review?: ReviewModel }[];
  title: string;

  // Pagination variables
  pages: number[] = [];
  recomendationsCurrentPage: { game: GameModel, review?: ReviewModel }[];
  recomendationsPerPage = 16;
  currentPage = 1;


  constructor(
    private readonly route: ActivatedRoute,
    private readonly recomendationService: RecomendationService,
  ) { }

  ngOnInit() {
    this.title = this.route.snapshot.data['title'];

    if (this.route.parent.snapshot.data['userSelf']) {
      this.recomendationService.getRecomendationsAllCurrentUser(
        this.route.snapshot.data['recomends'],
      ).subscribe( response => {
        this.recomendations = response;
        this.updatePages();
      });

    } else {
      this.recomendationService.getRecomendationsAllByUsername(
        this.route.parent.snapshot.data['user']['username'],
        this.route.snapshot.data['recomends'],
      ).subscribe( response => {
        this.recomendations = response;
        this.updatePages();
      });
    }
  }

  updatePages() {
    this.pages = [];

    for (let i = 1; i <= ((this.recomendations.length - 1) / this.recomendationsPerPage) + 1; i++) {
      this.pages.push(i);
    }

    this.goToPage(1);
  }

  goToPage(pageNumber: number) {
    if (pageNumber <= 0 || pageNumber > this.pages.length) { return; }

    this.currentPage = pageNumber;
    this.recomendationsCurrentPage = this.recomendations.slice(
      (pageNumber - 1) * this.recomendationsPerPage,
      (pageNumber - 1) * this.recomendationsPerPage + this.recomendationsPerPage);
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
