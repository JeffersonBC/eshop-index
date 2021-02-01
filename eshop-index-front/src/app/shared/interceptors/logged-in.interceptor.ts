import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, } from '@angular/common/http';
import { Router } from '@angular/router';

import { throwError,  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AccountService } from '@services/account.service';

@Injectable()
export class LoggedInInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private accountService: AccountService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.accountService.authTokenGet();

    if (authToken !== null) {
      req = req.clone({ setHeaders: { Authorization: 'JWT ' + authToken } });
    }

    return next.handle(req)
      .pipe(catchError((error, caught) => {
        // If the backend returns an error, either the token is invalid or has expired
        if (error.status === 401) {
          this.accountService.authTokenClean();
          this.router.navigate(['account/login']);

          return throwError(error);
        }
        return throwError(error);

      }) as any);
  }
}
