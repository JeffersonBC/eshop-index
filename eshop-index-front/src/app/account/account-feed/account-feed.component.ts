import { Component, OnInit } from '@angular/core';

import { FollowService } from '@services/following.service';
import { NeewsfeedItem } from '@models';


@Component({
  selector: 'app-account-feed',
  templateUrl: './account-feed.component.html',
  styleUrls: ['./account-feed.component.scss']
})
export class AccountFeedComponent implements OnInit {

  news: NeewsfeedItem[];

  constructor(
    private readonly followService: FollowService,
  ) { }

  ngOnInit() {
    this.followService.getNewsFeed().subscribe(response => this.news = response);
  }

}
