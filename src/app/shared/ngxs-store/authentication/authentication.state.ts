import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

import {
  State,
  Selector,
  Action,
  StateContext } from '@ngxs/store';
import { from } from 'rxjs';


/**
 * AuthStateModel = AuthenticationResponse
 */
export interface AuthStateModel {
  token: string | null;
  username: string | null;
}

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: { username: string; password: string }) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    username: null
  }
})

@Injectable({
  providedIn: 'root'
})


export class AuthState {
  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  constructor(private authService: AuthService ) {}

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
      console.log('inside login action')
    return this.authService.login(action.payload).pipe(
      // tap((result: { token: string }) => {
      tap((result: { username:string,token: string }) => {
      ctx.patchState({
          token: result.token,
           username: action.payload.username
          // username: result.username
        });
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    const state = ctx.getState();
        ctx.setState({
          token: null,
          username: null
        });

    // return this.authService.logout(state.token).pipe(
    //   tap(() => {
    //     ctx.setState({
    //       token: null,
    //       username: null
    //     });
    //   })
    // );

  }

}
