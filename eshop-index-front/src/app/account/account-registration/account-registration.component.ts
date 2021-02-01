import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NewUserRequest, NewUserForm } from '@models/user.model';
import { AccountService } from '@services/account.service';
import { FormUtil } from '@shared/utils/form.util';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-account-registration',
  templateUrl: './account-registration.component.html',
})
export class AccountRegistrationComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  public formInfo: NewUserForm = {} as NewUserForm;
  public captcha;

  public errorMessage = '';
  public registerDone = false;

  _loading = false;

  constructor(
    private accountService: AccountService,
  ) { }

  ngOnInit() {}

  isValid(): boolean {
    FormUtil.touchForm(this.form.control);
    return this.form.valid;
  }

  userFormToRequest(formInfo: NewUserForm): NewUserRequest {
    return {
      username: formInfo.username,
      email: formInfo.email,
      first_name: formInfo.firstName,
      last_name: formInfo.lastName,
      password: formInfo.password1,
    };
  }

  register() {
    if (this.isValid()) {
      this._loading = true;

      const newUserRequest = this.userFormToRequest(this.formInfo);
      this.accountService.postUserCreate(newUserRequest, this.captcha)
        .pipe(finalize( () => this._loading = false ))
        .subscribe(
          () => this.registerDone = true,
          error => {
            this.errorMessage = '';
            for (const key of Object.keys(error.error)) {
              this.errorMessage += `${this.errorMessage ? '<br>' : ''}${error.error[key]}`;
            }
            window.scroll(0, 0);
          }
        );
    }
  }

}
