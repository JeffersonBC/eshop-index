import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { toast } from 'angular2-materialize';
import { finalize } from 'rxjs/operators';

import { AccountService } from '@services/account.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account-resend-activation',
  templateUrl: './account-resend-activation.component.html',
  styleUrls: [],
})
export class AccountResendActivationComponent {

  formInfo = { email: '' };
  captcha: string;

  _errorMessage: string;
  _loading = false;

  constructor(
    private readonly accountService: AccountService,
    private readonly router: Router,
  ) { }

  send() {
    this._loading = true;

    this.accountService.postUserResendActivationEmail(this.formInfo.email, this.captcha)
      .pipe(finalize( () => this._loading = false ))
      .subscribe(
        () => {
          toast('Another activation email will be sent soon.', 5000);

            this.router.navigate(['/account/login']);
        },

        (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this._errorMessage = 'Could not generate an activation email for this address.<br><br>'
              + 'Either this account has already been activated, or this email isn\'t associated with any user';
          } else {
            this._errorMessage = 'There was an error while processing your request. Please try again later.';
          }
        }
      );
  }

}
