import { Component, OnInit } from '@angular/core';
import { GameModel, ReviewModel } from '@models';
import { ActivatedRoute } from '@angular/router';
import { RecomendationService } from '@services/classification/recomendation.service';

@Component({
  selector: 'app-user-profile-overview',
  templateUrl: './user-profile-overview.component.html',
  styleUrls: ['./user-profile-overview.component.scss']
})
export class UserProfileOverviewComponent implements OnInit {

  likes: { game: GameModel, review?: ReviewModel }[];
  dislikes: { game: GameModel, review?: ReviewModel }[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly recomendationService: RecomendationService,
  ) { }

  ngOnInit() {
    if (this.route.snapshot.data['userSelf']) {
      this.recomendationService.getRecomendationsCurrentUser().subscribe(
        response => {
          this.likes = response.likes;
          this.dislikes = response.dislikes;
        });

    } else {
      this.recomendationService
        .getRecomendationsByUsername(this.route.snapshot.data['user']['username'])
        .subscribe(
          response => {
            this.likes = response.likes;
            this.dislikes = response.dislikes;
          });
    }
  }

}
