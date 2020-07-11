import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DisplayComponent } from './display/display.component';
import { HeroesComponent } from './heroes/heroes/heroes.component';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { HeroState } from "../app/heroes/store/hero.state";
import { HeroesModule } from './heroes/heroes.module';

import { LoginComponent } from './shared/ngxs-store/authentication/login/login.component';
import { AuthState } from './shared/ngxs-store/authentication/auth.state';

import { TokenInterceptorService } from '../app/shared/interceptors/token.interceptor.service';
import { HeroListComponent } from './heroes/hero-list/hero-list.component';
import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { environment } from '../environments/environment';
import { APP_INITIALIZER } from '@angular/core';

import { RouteHandler } from '../app/shared/ngxs-store/route/route.handler';
import  { NgxsToasterService }  from '../app/shared//ngxs-store/toaster/ngxs.toaster.service'

import { ModalComponent } from '../app/modal/modal.component';

// Noop handler for factory function
export function noop() {
  return function () { };
}

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    // HeroesComponent,
    LoginComponent,
    // HeroListComponent,
    // HeroDetailComponent,
    ToolbarComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,


    NgxsModule.forRoot([
      HeroState,
      AuthState
    ],
      { developmentMode: !environment.production }
    ),
    NgxsStoragePluginModule.forRoot({
      key: 'auth.token'


    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),


  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: noop,
      deps: [RouteHandler,NgxsToasterService],
      multi: true
    }
  ],
entryComponents:[ModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

