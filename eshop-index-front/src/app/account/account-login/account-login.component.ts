import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { finalize } from 'rxjs/operators';

import { LoginForm } from '@models/user.model';
import { AccountService } from '@services/account.service';
import { LoginEmitService } from '@services/login-emit.service';


@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.scss']
})
export class AccountLoginComponent implements OnInit {

  public formulario: FormGroup;
  public errorMessage = '';

  _loading = false;

  constructor(
    private accountService: AccountService,
    private loginEmitService: LoginEmitService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  tryLogin() {
    const loginInfo: LoginForm = this.formulario.value;
    this.errorMessage = '';

    this._loading = true;

    this.accountService.postUserLogin(loginInfo)
      .pipe(finalize( () => this._loading = false ))
      .subscribe(response => {
        this.accountService.authTokenSet(response['token']);

        this.accountService.getAdminVerify()
          .subscribe(
            () => this.loginEmitService.emitChangeAdmin(true),
            () => this.loginEmitService.emitChangeAdmin(false),
          );

        this.router.navigate(['']);
      },

      error => {
        if ('error' in error && error['error'] != null) {
          if ('non_field_errors' in error['error']) {
            for (const message of error['error']['non_field_errors']) {
              this.errorMessage += message;
            }
          }
        } else {
          this.errorMessage = 'Couldn\'t connect to the login server, please try again later.';
        }
      }
    );
  }

}
