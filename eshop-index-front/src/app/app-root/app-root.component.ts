import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AccountService } from '@services/account.service';
import { LoginEmitService } from '@services/login-emit.service';
import { map } from 'rxjs/operators';
import { AppRootCountryModalComponent } from './app-root-country-modal/app-root-country-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss'],
})
export class AppRootComponent implements OnInit {

  @ViewChild(AppRootCountryModalComponent) countryModal: AppRootCountryModalComponent;

  public loggedIn = false;
  public isAdmin = false;

  private authTokenRefreshInterval;


  constructor(
    private router: Router,
    private route: ActivatedRoute,

    private loginEmitService: LoginEmitService,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.loginEmitService.changeEmittedLogin$.subscribe(
      isLoggedIn => {
        // User logged
        if (isLoggedIn) {
          // Emitted 'true' is a state change
          if (!this.loggedIn) {
            this.loggedIn = true;

            // Refreshes the auth token once and then again every 5 minutes
            this.accountService.authTokenRefresh();
            this.authTokenRefreshInterval = setInterval(
              () => { this.accountService.authTokenRefresh(); } , 1000 * 60 * 5
            );
          }
        // User not logged
        } else {
          clearInterval(this.authTokenRefreshInterval);
        }
      }
    );

    this.loginEmitService.changeEmittedAdmin$.subscribe(
      isAdmin => this.isAdmin = isAdmin
    );

    // If there's a token stored, verify its validity with the backend and emits the result at LoginEmitService
    this.route.data.pipe(map(data => data['isLogged'])).subscribe(
      (response: boolean) => this.loginEmitService.emitChangeLogin(response),
      () => this.loginEmitService.emitChangeLogin(false)
    );

    this.route.data.pipe(map(data => data['isAdmin'])).subscribe(
      (response: boolean) => this.loginEmitService.emitChangeAdmin(response),
      () => this.loginEmitService.emitChangeAdmin(false)
    );
  }

  public logoff() {
    this.loggedIn = false;
    this.accountService.authTokenClean();
    this.router.navigate(['/account', 'login']);
  }

  public openModal() {
    this.countryModal.openModal();
  }

}
