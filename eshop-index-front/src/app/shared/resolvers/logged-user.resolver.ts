import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';

import { AccountService } from '@services/account.service';
import { catchError } from 'rxjs/operators';


@Injectable()
export class LoggedUserResolver implements Resolve<any> {
  constructor(
    private accountService: AccountService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | any {

    if (this.accountService.isAuthenticated()) {
      return this.accountService.getUser()
        .pipe(catchError( () => of({ success: false, msg: [] }) ));

    } else {
      return {};
    }
  }
}
