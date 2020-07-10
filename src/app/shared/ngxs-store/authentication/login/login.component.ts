import { Component, OnInit, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';

import { Store, Select } from '@ngxs/store'
import { Login } from '../auth.state';

import { AuthState } from '../auth.state';
import { Observable } from 'rxjs';

export class LoginRequest {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  @Select(AuthState.error) error$: Observable<boolean>;

  constructor(private store: Store){

  }
  loginRequest: LoginRequest = new LoginRequest();


  ngOnInit(): void {

  }

  authentication() {

    const authenticateUser = {
      username: this.loginRequest.username,
      password: this.loginRequest.password
    };
    this.store.dispatch(new Login(authenticateUser));
  }
  // resetState(){
  //   this.store.reset(AuthState);
  // }

}
