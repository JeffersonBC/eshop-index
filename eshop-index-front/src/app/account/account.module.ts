import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterializeModule } from 'angular2-materialize';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { SharedModule } from '@shared/shared.module';

import { AccountRoutingModule } from './account-routing.module';

import { AccountFeedComponent } from './account-feed/account-feed.component';
import { AccountFollowingComponent } from './account-following/account-following.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountPasswordResetComponent } from './account-password-reset/account-password-reset.component';
import { AccountPasswordResetNewComponent } from './account-password-reset/account-password-reset-new/account-password-reset-new.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { AccountRegistrationComponent } from './account-registration/account-registration.component';
import { AccountResendActivationComponent } from './account-resend-activation/account-resend-activation.component';
import { AccountReviewComponent } from './account-review/account-review.component';
import { AccountReviewFormComponent } from './account-review/account-review-form/account-review-form.component';
import { AccountRegistrationActivateComponent
  } from './account-registration/account-registration-activate/account-registration-activate.component';


@NgModule({
  imports: [
    MaterializeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    AccountRoutingModule,

    SharedModule,
  ],
  declarations: [
    AccountFeedComponent,
    AccountFollowingComponent,
    AccountLoginComponent,
    AccountPasswordResetComponent,
    AccountPasswordResetNewComponent,
    AccountProfileComponent,
    AccountRegistrationComponent,
    AccountRegistrationActivateComponent,
    AccountResendActivationComponent,
    AccountReviewComponent,
    AccountReviewFormComponent,
  ],
})
export class AccountModule { }
