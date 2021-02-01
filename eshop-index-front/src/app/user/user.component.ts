import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserProfileModel } from '@models';


@Component({
  selector: 'app-user',
  styleUrls: [],
  template: `
    <app-user-profile
      [user]="user"
      [showFollowButton]="true">
    </app-user-profile>
  `,
})
export class UserComponent implements OnInit {

  user: UserProfileModel;

  constructor(
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
  }

}
