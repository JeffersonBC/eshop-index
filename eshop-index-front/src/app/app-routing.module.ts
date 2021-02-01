import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRootComponent } from './app-root/app-root.component';
import { HomeComponent } from './home/home.component';

import { AboutComponent } from './about/about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ContactComponent } from './contact/contact.component';

import { AdminResolver } from '@resolvers/admin.resolver';
import { AuthResolver } from '@resolvers/auth.resolver';


const appRoutes: Routes = [
  { path: '', component: AppRootComponent,
    resolve: { isLogged: AuthResolver, isAdmin: AdminResolver },
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'privacy', component: PrivacyComponent },

      { path: 'account', loadChildren: 'app/account/account.module#AccountModule' },
      { path: 'admin', loadChildren: 'app/admin-area/admin-area.module#AdminAreaModule' },
      { path: 'game', loadChildren: 'app/game/game.module#GameModule' },
      { path: 'search', loadChildren: 'app/search/search.module#SearchModule' },
      { path: 'user', loadChildren: 'app/user/user.module#UserModule' },
      { path: 'wishlist', loadChildren: 'app/wishlist/wishlist.module#WishlistModule' },
      { path: '**', redirectTo: '' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
