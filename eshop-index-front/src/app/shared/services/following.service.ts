import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { UserCardModel, NeewsfeedItem } from '@models';
import { Endpoints } from '@shared/utils/endpoints.util';


@Injectable()
export class FollowService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  public postFollowByUsername(username: string) {
    return this.http.post(Endpoints.get('followByUsername', username), null);
  }

  public deleteFollowByUsername(username: string) {
    return this.http.delete(Endpoints.get('followByUsername', username));
  }

  public getFollowingUsers(): Observable<UserCardModel[]>  {
    return this.http.get(Endpoints.get('followingUsers')) as Observable<UserCardModel[]>;
  }

  public getNewsFeed(): Observable<NeewsfeedItem[]> {
    return this.http.get(Endpoints.get('newsFeed')) as Observable<NeewsfeedItem[]>;
  }
}
