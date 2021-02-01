import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './wishlist.component';
import { WishlistRoutingModule } from './wishlist-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    WishlistRoutingModule,

    SharedModule,
  ],
  declarations: [WishlistComponent]
})
export class WishlistModule { }
