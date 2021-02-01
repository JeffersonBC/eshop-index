import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { toast } from 'angular2-materialize';
import { finalize } from 'rxjs/operators';

import { AccountService } from '@services/account.service';


@Component({
  selector: 'app-account-password-reset',
  templateUrl: './account-password-reset.component.html',
  styleUrls: [],
})
export class AccountPasswordResetComponent {

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

    this.accountService.postUserPasswordResetEmail(this.formInfo.email, this.captcha)
      .pipe(finalize( () => this._loading = false ))
      .subscribe(
        () => {
          toast('Your request for resetting you password was successfully sent!\n'
            + 'An email with a link to reset your password will be sent soon.', 8000);

            this.router.navigate(['/account/login']);
        },

        (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this._errorMessage = 'No user was found for this email address.';
          } else {
            this._errorMessage = 'There was an error while processing your request. Please try again later.';
          }
        }
      );
  }

}
