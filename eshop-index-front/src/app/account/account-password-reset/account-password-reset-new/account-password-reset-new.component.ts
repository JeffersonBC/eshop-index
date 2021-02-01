import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { finalize } from 'rxjs/operators';

import { AccountService } from '@services/account.service';
import { toast } from 'angular2-materialize';


@Component({
  selector: 'app-account-password-reset-new',
  templateUrl: './account-password-reset-new.component.html',
  styleUrls: [],
})
export class AccountPasswordResetNewComponent implements OnInit {

  formInfo = { password1: '', password2: '' };
  formParams = { uid_b64: '', token: '' };

  errorMessage: string;
  _loading = false;
  _success = false;

  constructor(
    private readonly accountService: AccountService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) { }

  ngOnInit() {
    this.formParams.uid_b64 = this.route.snapshot.params['uid_b64'];
    this.formParams.token = this.route.snapshot.params['token'];
  }

  send() {
    this._loading = true;

    this.accountService.postUserPasswordReset(
      this.formParams.uid_b64,
      this.formParams.token,
      this.formInfo.password1
    )
      .pipe(finalize( () => this._loading = false ))
      .subscribe(
        () => {
          toast('Password successfully reset! You can now log in with your new password.', 5000);
          this.router.navigate(['/account/login']);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.errorMessage = 'This passowrd resetting link is invalid.<br>' +
              'It may have already been used, or it already expired.';

          } else if (error.status === 400) {
            this.errorMessage = '';
            for (const key of Object.keys(error.error)) {
              this.errorMessage += `${this.errorMessage ? '<br>' : ''}${error.error[key]}`;
            }

          } else {
            this.errorMessage = 'There was an error while processing your request. Please try again later.';
          }
        }
      );
  }
}
