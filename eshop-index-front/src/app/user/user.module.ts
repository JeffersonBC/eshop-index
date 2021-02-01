import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';

import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from './user.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,

    SharedModule,
  ],
  declarations: [UserComponent]
})
export class UserModule { }
