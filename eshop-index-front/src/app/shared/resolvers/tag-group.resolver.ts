import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { TagService } from '@services/classification/tag.service';


@Injectable()
export class TagGroupResolver implements Resolve<any> {
  constructor(
    private tagService: TagService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | any {

    return this.tagService.getTagGroup(route.params['id']);
  }
}
