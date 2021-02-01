import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AccountService } from '@services/account.service';


@Injectable()
export class AdminResolver implements Resolve<boolean> {
  constructor(
    private accountService: AccountService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    return this.accountService.isAuthenticated()
      ? this.accountService.getAdminVerify().pipe(catchError(() => of(false)))
      : of(false);
  }
}
