import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store'
import { AuthState} from '../../authentication/store/auth.state'


@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private store: Store) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authenticated = this.store.selectSnapshot(AuthState.isAuthenticated)

    const token = this.store.selectSnapshot(AuthState.token);

    if (authenticated) {
      console.log('let me add the token! user is authenticated')
      request = request.clone(
        {
          setHeaders: {
            Authorization: 'Bearer ' + token
          }
        }
      )
    }
    else{
      console.log('cannot add token you are not authenticated')
    }
    return next.handle(request);
  }
}
