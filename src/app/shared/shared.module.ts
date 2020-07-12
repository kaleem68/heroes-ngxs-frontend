import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/logged.in.guard';
import { RouteHandler } from './route/route.handler';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './interceptors/token.interceptor.service';
import { NgxsToasterService } from './toaster/ngxs.toaster.service';
import { ToastService } from './toaster/toast.service';


// Noop handler for factory function
export function noop() {
  return function () { };
}

@NgModule({
  imports: [],
  exports: [],
  declarations: [],

  providers: [AuthGuard, LoggedInGuard, RouteHandler, ToastService ,NgxsToasterService,
   
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
   
    {
      provide: APP_INITIALIZER,
      useFactory: noop,
      deps: [RouteHandler],       // deps: [RouteHandler,NgxsToasterService],
      multi: true
    }

  ],

})
export class SharedModule { }
