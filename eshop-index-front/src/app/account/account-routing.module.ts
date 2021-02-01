import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@guards/auth.guard';
import { NotAuthGuard } from '@guards/not-auth.guard';
import { LoggedUserResolver } from '@resolvers/logged-user.resolver';
import { ReviewResolver } from '@resolvers/review.resolver';
import { RecomendationResolver } from '@resolvers/recomendation.resolver';

import { AccountFeedComponent } from './account-feed/account-feed.component';
import { AccountFollowingComponent } from './account-following/account-following.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountPasswordResetComponent } from './account-password-reset/account-password-reset.component';
import { AccountPasswordResetNewComponent
  } from './account-password-reset/account-password-reset-new/account-password-reset-new.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { AccountRegistrationComponent } from './account-registration/account-registration.component';
import { AccountRegistrationActivateComponent
} from './account-registration/account-registration-activate/account-registration-activate.component';
import { AccountResendActivationComponent } from './account-resend-activation/account-resend-activation.component';
import { AccountReviewComponent } from './account-review/account-review.component';

import { UserProfileOverviewComponent } from '@components/user-profile/user-profile-overview/user-profile-overview.component';
import { UserProfileRecomendationsComponent
  } from '@components/user-profile/user-profile-recomendations/user-profile-recomendations.component';


const appRoutes: Routes = [
  { path: '', component: AccountProfileComponent,
    resolve: { user: LoggedUserResolver }, data: { userSelf: true },
    canActivate: [ AuthGuard ], canLoad: [ AuthGuard ],
    children: [
      { path: '', component: UserProfileOverviewComponent,
        data: { windowTitle: 'Account Profile' }, },

      { path: 'recomendations/likes', component: UserProfileRecomendationsComponent,
        data: { recomends: 'likes', title: 'Likes', windowTitle: 'Account Profile' }, },

      { path: 'recomendations/dislikes', component: UserProfileRecomendationsComponent,
        data: { recomends: 'dislikes', title: 'Dislikes', windowTitle: 'Account Profile' } },
    ]},

  { path: 'following', component: AccountFollowingComponent,
    canActivate: [ AuthGuard ], canLoad: [ AuthGuard ],
    data: { windowTitle: 'Following Users' } },

  { path: 'login', component: AccountLoginComponent,
    canActivate: [ NotAuthGuard ], canLoad: [ NotAuthGuard ],
    data: { windowTitle: 'Login' }, },

  { path: 'newsfeed', component: AccountFeedComponent,
    canActivate: [ AuthGuard ], canLoad: [ AuthGuard ],
    data: { windowTitle: 'News Feed' }, },

  { path: 'password/reset', component: AccountPasswordResetComponent,
    canActivate: [ NotAuthGuard ], canLoad: [ NotAuthGuard ],
    data: { windowTitle: 'Password Reset' } },
  { path: 'password/reset/:uid_b64/:token', component: AccountPasswordResetNewComponent,
    canActivate: [ NotAuthGuard ], canLoad: [ NotAuthGuard ],
    data: { windowTitle: 'Password Reset' }, },

  { path: 'register', component: AccountRegistrationComponent,
    canActivate: [ NotAuthGuard ], canLoad: [ NotAuthGuard ],
    data: { windowTitle: 'Account Register' }, },
  { path: 'register/activate/:uid_b64/:token', component: AccountRegistrationActivateComponent,
    canActivate: [ NotAuthGuard ], canLoad: [ NotAuthGuard ],
    data: { windowTitle: 'Account Activate' }, },
  { path: 'register/activate/resend_email', component: AccountResendActivationComponent,
    canActivate: [ NotAuthGuard ], canLoad: [ NotAuthGuard ],
    data: { windowTitle: 'Resend Activation Email' }, },

  { path: 'review/:game_code', component: AccountReviewComponent,
    resolve: { review: ReviewResolver, recomendation: RecomendationResolver },
    canActivate: [ AuthGuard ], canLoad: [ AuthGuard ],
    data: { windowTitle: 'Write Review' }, },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
