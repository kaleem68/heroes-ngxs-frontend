import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState} from '../../authentication/store/auth.state'

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private store: Store,private router: Router) {}

  canActivate() {
    const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
     if(!isAuthenticated){
       return true
     }
     else {
      return this.router.parseUrl('/heroes');
     }
  }
}

