import { Component, OnInit } from '@angular/core';

import { finalize } from 'rxjs/operators';

import { UserCardModel } from '@models';
import { AnalyticsService } from '@services/analytics.service';
import { FollowService } from '@services/following.service';


@Component({
  selector: 'app-account-following',
  templateUrl: './account-following.component.html',
  styleUrls: ['./account-following.component.scss']
})
export class AccountFollowingComponent implements OnInit {

  users: Array<UserCardModel & { _loadingUnfollow?: boolean }>;

  constructor(
    private readonly followService: FollowService,
    private readonly analyticsService: AnalyticsService,
  ) { }

  ngOnInit() {
    this.followService.getFollowingUsers().subscribe(users => this.users = users);
  }

  clickUnfollow(index: number) {
    this.users[index]._loadingUnfollow = true;

    this.followService.deleteFollowByUsername(this.users[index].username)
      .pipe(finalize( () => this.users[index]._loadingUnfollow = false ))
      .subscribe( () => {
        this.users.splice(index, 1);
        this.analyticsService.trackEvent('Unfollow', 'Users Following', `@${this.users[index].username}`);
      });
  }
}
