import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';

import { AccountService } from '@services/account.service';
import { catchError } from 'rxjs/operators';
import { UserModel } from '@models';


@Injectable()
export class UserResolver implements Resolve<UserModel> {
  constructor(
    private accountService: AccountService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<UserModel> {

    if (route.params['username']) {
      return this.accountService.getUserByUsername(route.params['username'])
        .pipe(catchError( () => of({} as UserModel) ));

    } else {
      return of({} as UserModel);
    }
  }
}
