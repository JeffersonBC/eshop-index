import { Component, Input } from '@angular/core';

import { finalize } from 'rxjs/operators';

import { UserProfileModel } from '@models';
import { AnalyticsService } from '@services/analytics.service';
import { FollowService } from '@services/following.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  @Input() user: UserProfileModel;
  @Input() showFollowButton: boolean;

  _loadingFollow = false;


  constructor(
    private readonly followService: FollowService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  clickFollow() {
    if (this.user.is_following === null) { return; }

    this._loadingFollow = true;

    if (this.user.is_following === false) {
      this.followService.postFollowByUsername(this.user.username)
        .pipe(finalize( () => this._loadingFollow = false ))
        .subscribe( () => {
          this.user.is_following = true;
          this.analyticsService.trackEvent('Follow', 'User Profile', `@${this.user.username}`);
        });

    } else {
      this.followService.deleteFollowByUsername(this.user.username)
        .pipe(finalize( () => this._loadingFollow = false ))
        .subscribe( () => {
          this.user.is_following = false;
          this.analyticsService.trackEvent('Unfollow', 'User Profile', `@${this.user.username}`);
        });
    }
  }
}
