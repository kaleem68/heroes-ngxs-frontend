import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { HeroState } from "../app/heroes/store/hero.state";
import { MaterialModule } from '../app/material/material.module';
import { ModalComponent } from '../app/modal/modal.component';
import { NgxsToasterService } from '../app/shared//ngxs-store/toaster/ngxs.toaster.service';
import { TokenInterceptorService } from '../app/shared/interceptors/token.interceptor.service';
import { RouteHandler } from '../app/shared/ngxs-store/route/route.handler';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthState } from './shared/ngxs-store/authentication/auth.state';
import { LoginComponent } from './shared/ngxs-store/authentication/login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AuthGuard } from './shared/guards/auth.guard';

// Noop handler for factory function
export function noop() {
  return function () { };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
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
    AuthGuard,
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

