import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

import {
  State,
  Selector,
  Action,
  StateContext,
  Store
} from '@ngxs/store';


export interface AuthStateModel {
  token: string | null;
  username: string | null;
  error: boolean
}

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: { username: string; password: string }) { }
}


export class Logout {
  static readonly type = '[Auth] Logout';
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    username: null,
    error: false
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
  @Selector()
  static error(state: AuthStateModel) {
    return state.error
  }

  constructor(private authService: AuthService, private store: Store) { }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {

    return this.authService.login(action.payload).pipe(
      tap(
        (result: { username: string, token: string }) => {
          ctx.patchState({
            token: result.token,
            username: result.username,
            error: false
          });
        },
        (error) => {
          ctx.patchState({
            error: true
          });
          return error;
        }

      )

    )


  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      token: null,
      username: null,
      error: false
    });


  }

}
