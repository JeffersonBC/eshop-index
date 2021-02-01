import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

import { LoginForm, NewUserRequest, UserModel } from '@models/user.model';
import { Endpoints } from '@shared/utils/endpoints.util';
import { LoginEmitService } from '@services/login-emit.service';
import { Observable } from 'rxjs';


@Injectable()
export class AccountService {

  public readonly jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private readonly http: HttpClient,
    private readonly loginEmitService: LoginEmitService,
  ) {}

  public postUserCreate(user: NewUserRequest, captcha: string) {
    return this.http.post(
      Endpoints.get(Endpoints.userCreate),
      { ...user, captcha }
    );
  }

  public postUserLogin(loginInfo: LoginForm) {
    return this.http.post(Endpoints.get(Endpoints.userTokenGet), loginInfo);
  }

  public postUserResendActivationEmail(email: string, captcha: string) {
    return this.http.post(
      Endpoints.get(Endpoints.userActivationEmail),
      { email, captcha }
    );
  }

  public postUserActivate(userIdB64: string, token: string) {
    return this.http.post(Endpoints.get(Endpoints.userActivate, userIdB64, token), null);
  }

  public postUserPasswordReset(userIdB64: string, token: string, password: string) {
    return this.http.post(Endpoints.get(Endpoints.userPasswordReset, userIdB64, token), { password });
  }

  public postUserPasswordResetEmail(email: string, captcha: string) {
    return this.http.post(
      Endpoints.get(Endpoints.userPasswordResetEmail),
      { email, captcha }
    );
  }


  public getUser() {
    return this.http.get(Endpoints.get(Endpoints.userGet));
  }

  public getUserByUsername(username: string): Observable<UserModel> {
    return this.http.get(Endpoints.get(Endpoints.userGetByUsername, username)) as Observable<UserModel>;
  }

  public getAuthTokenVerify(): Observable<boolean> {
    return this.authTokenGet()
      ? this.http.get(Endpoints.get(Endpoints.userTokenVerify)) as Observable<boolean>
      : null;
  }

  public getAdminVerify(): Observable<boolean> {
    return this.authTokenGet()
      ? this.http.get(Endpoints.get(Endpoints.userAdminVerify)) as Observable<boolean>
      : null;
  }


  public authTokenSet(authToken: string) {
    localStorage.setItem('auth_token', authToken);
    this.loginEmitService.emitChangeLogin(true);
  }

  public authTokenGet() {
    return localStorage.getItem('auth_token');
  }

  public authTokenClean() {
    localStorage.removeItem('auth_token');
    this.loginEmitService.emitChangeLogin(false);
    this.loginEmitService.emitChangeAdmin(false);
  }

  public authTokenVerify() {
    if (this.authTokenGet()) {
      this.http.get(Endpoints.get(Endpoints.userTokenVerify)).subscribe(
        () => {
          this.loginEmitService.emitChangeLogin(true);

          this.getAdminVerify().subscribe(
            () => this.loginEmitService.emitChangeAdmin(true),
            () => this.loginEmitService.emitChangeAdmin(false),
          );
        },
        () => this.authTokenClean(),
      );
    }
  }

  public authTokenRefresh() {
    const authToken = this.authTokenGet();

    if (this.authTokenGet()) {
      const authTokenPayload = { token: authToken };

      this.http.post(Endpoints.get(Endpoints.userTokenRefresh), authTokenPayload).subscribe(
        response => {
          this.authTokenSet(response['token']);
          this.authTokenVerify();
        },
        () => this.authTokenVerify(),
      );
    }
  }

  public isAuthenticated(): boolean {
    return (
      !this.jwtHelper.isTokenExpired(this.authTokenGet())
      && this.loginEmitService.checkCurrentStatusLogin()
    );
  }

  public isAdmin(): boolean {
    return (
      !this.jwtHelper.isTokenExpired(this.authTokenGet())
      && this.loginEmitService.checkCurrentStatusAdmin()
    );
  }
}
