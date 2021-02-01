import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AccountService } from '@services/account.service';


@Component({
  selector: 'app-account-registration-activate',
  templateUrl: './account-registration-activate.component.html',
  styleUrls: [],
})
export class AccountRegistrationActivateComponent implements OnInit {

  success: boolean = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly accountService: AccountService,
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.params);
    this.accountService.postUserActivate(
      this.route.snapshot.params['uid_b64'],
      this.route.snapshot.params['token'],
    ).subscribe(
      () => this.success = true,
      () => this.success = false,
    );
  }

}
