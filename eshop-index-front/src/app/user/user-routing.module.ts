import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserResolver } from '@resolvers/user.resolver';

import { UserComponent } from './user.component';
import { UserProfileOverviewComponent } from '@components/user-profile/user-profile-overview/user-profile-overview.component';
import { UserProfileRecomendationsComponent,
  } from '@components/user-profile/user-profile-recomendations/user-profile-recomendations.component';


const appRoutes: Routes = [
  { path: ':username', component: UserComponent,
    resolve: { user: UserResolver },
    data: { userSelf: false },
    children: [
      { path: '', component: UserProfileOverviewComponent },

      { path: 'recomendations/likes', component: UserProfileRecomendationsComponent,
        data: { recomends: 'likes', title: 'Likes' } },

      { path: 'recomendations/dislikes', component: UserProfileRecomendationsComponent,
        data: { recomends: 'dislikes', title: 'Dislikes' } },
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
