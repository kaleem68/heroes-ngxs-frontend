import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppStoreModule } from '../app/app-store/app.store.module';
import { MaterialModule } from '../app/material/material.module';
import { ModalComponent } from '../app/modal/modal.component';
import { NgxsToasterService } from '../app/shared//ngxs-store/toaster/ngxs.toaster.service';
import { TokenInterceptorService } from '../app/shared/interceptors/token.interceptor.service';
// import { RouteHandler } from '../app/shared/ngxs-store/route/route.handler';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './shared/ngxs-store/authentication/login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

import { SharedModule } from './shared/shared.module';

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

    AppStoreModule,
    SharedModule

  ],
  providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },

        {
          provide: APP_INITIALIZER,
          useFactory: noop,
          deps: [NgxsToasterService],
          multi: true
        }
  ],
entryComponents:[ModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

