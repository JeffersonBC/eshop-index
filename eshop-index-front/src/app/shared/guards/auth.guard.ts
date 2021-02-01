import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
} from '@angular/router';

import { Observable } from 'rxjs';

import { AccountService } from '@services/account.service';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private accountService: AccountService,
    private router: Router,
  ) { }

  private verifyAccess() {
    if (this.accountService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/account/login']);
    return false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    return this.verifyAccess();
  }

  canLoad(
    route: Route
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.verifyAccess();
  }

}
