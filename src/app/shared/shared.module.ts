import { NgModule } from '@angular/core';

import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptorService } from './interceptors/token.interceptor.service';
import { LoggedInGuard } from './guards/logged.in.guard';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [AuthGuard,LoggedInGuard, TokenInterceptorService],
})
export class SharedModule { }
