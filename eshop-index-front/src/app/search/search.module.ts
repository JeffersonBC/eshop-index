import { MaterializeModule } from 'angular2-materialize';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';


@NgModule({
  imports: [
    MaterializeModule,

    CommonModule,
    FormsModule,
    RouterModule,
    SearchRoutingModule,

    SharedModule,
  ],
  declarations: [SearchComponent]
})
export class SearchModule { }
