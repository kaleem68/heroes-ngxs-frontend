import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/logged.in.guard';
import { RouteHandler } from './route/route.handler';


// Noop handler for factory function
export function noop() {
  return function () { };
}

@NgModule({
  imports: [],
  exports: [],
  declarations: [],

  providers: [AuthGuard, LoggedInGuard,RouteHandler,
    {

      provide: APP_INITIALIZER,
      useFactory: noop,
      deps: [RouteHandler],
      multi: true
    }

  ],

})
export class SharedModule { }
