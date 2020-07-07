import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store'
import { AuthState } from '../ngxs-store/authentication/authentication.state';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private store: Store) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authenticated = this.store.selectSnapshot(AuthState.isAuthenticated)
    const token = this.store.selectSnapshot(AuthState.token);
    if (authenticated) {
      console.log('user is logged in appendning the token...')
      request = request.clone(
        {
          setHeaders: {
            Authorization: 'Bearer ' + token
          }
        }
      )
    }
    return next.handle(request);
  }
}
