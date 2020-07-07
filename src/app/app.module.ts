import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../app/material/material.module';
import { FormsModule } from '@angular/forms';

import { DisplayComponent } from './display/display.component';
import { HeroesComponent } from './heroes/heroes/heroes.component';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin'
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { HeroState } from "../app/heroes/store/hero.state";
import { LoginComponent } from './shared/ngxs-store/authentication/login/login.component';
import { AuthState } from './shared/ngxs-store/authentication/authentication.state';

import { TokenInterceptorService } from '../app/shared/interceptors/token.interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    HeroesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,

    NgxsModule.forRoot([
      HeroState,
      AuthState
    ]),
    NgxsStoragePluginModule.forRoot({
      key: 'auth.token'
    }),
  NgxsReduxDevtoolsPluginModule.forRoot(),
  NgxsLoggerPluginModule.forRoot(),


  ],
  providers:  [{provide:HTTP_INTERCEPTORS,useClass: TokenInterceptorService,multi:true} ],

  bootstrap: [AppComponent]
})
export class AppModule { }
