import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search.component';


const appRoutes: Routes = [
  { path: '', component: SearchComponent,
    data: { windowTitle: 'Game Search' } },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
