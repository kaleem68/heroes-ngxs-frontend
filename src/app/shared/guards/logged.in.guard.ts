import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../ngxs-store/authentication/auth.state';

@Injectable({
  providedIn: 'root'
})
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

