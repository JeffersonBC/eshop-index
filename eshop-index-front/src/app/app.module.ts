import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MaterializeModule } from 'angular2-materialize';
import { Angulartics2Module } from 'angulartics2';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { SwiperModule } from 'ngx-swiper-wrapper';

import { SharedModule } from '@shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppRootComponent } from './app-root/app-root.component';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PrivacyComponent } from './privacy/privacy.component';

import { LoggedInInterceptor } from '@interceptors';
import { environment } from '@env/environment.prod';
import { ContactComponent } from './contact/contact.component';
import { AppRootCountryModalComponent } from './app-root/app-root-country-modal/app-root-country-modal.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    AppRootComponent,

    AboutComponent,
    HomeComponent,
    PrivacyComponent,
    ContactComponent,
    AppRootCountryModalComponent,
  ],
  imports: [
    MaterializeModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    SwiperModule,
    SharedModule.forRoot(),
    AppRoutingModule,
    Angulartics2Module.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoggedInInterceptor, multi: true },
    { provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: environment.googleReCAPTCHA.trackingID } as RecaptchaSettings },
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
