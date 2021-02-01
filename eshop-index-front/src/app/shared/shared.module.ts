import { MaterializeModule } from 'angular2-materialize';

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SwiperModule } from 'ngx-swiper-wrapper';

import { components } from '@components';
import { directives } from '@directives';
import { guards } from '@guards';
import { resolvers } from '@resolvers';
import { pipes } from '@pipes';
import { services } from '@services';


@NgModule({
  imports: [
    MaterializeModule,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    SwiperModule,
  ],
  declarations: [
    ...components,
    ...directives,
    ...pipes,
  ],
  exports: [
    ...components,
    ...directives,
    ...pipes,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ...guards,
        ...resolvers,
        ...services,
      ],
    };
  }
}
