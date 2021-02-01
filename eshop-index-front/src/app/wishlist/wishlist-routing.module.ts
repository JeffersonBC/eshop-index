import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WishlistComponent } from './wishlist.component';


const appRoutes: Routes = [
  { path: '', component: WishlistComponent,
    data: { windowTitle: 'Wishlist' }, },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class WishlistRoutingModule { }
