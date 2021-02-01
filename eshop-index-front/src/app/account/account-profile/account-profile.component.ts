import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GameModel, UserProfileModel, ReviewModel } from '@models';
import { RecomendationService } from '@services/classification/recomendation.service';


@Component({
  selector: 'app-account-profile',
  styleUrls: [],
  template: `<app-user-profile [user]="user"></app-user-profile>`,
})
export class AccountProfileComponent implements OnInit {

  user: UserProfileModel;
  likes: { game: GameModel, review?: ReviewModel }[];
  dislikes: { game: GameModel, review?: ReviewModel }[];


  constructor(
    private readonly recomendationService: RecomendationService,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
    this.user.username = this.route.snapshot.data['user']['username'];

    this.recomendationService.getRecomendationsCurrentUser().subscribe(
      data => {
        this.likes = data['likes'];
        this.dislikes = data['dislikes'];
      }
    );
  }

}
