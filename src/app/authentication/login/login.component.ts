import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState, Login } from '../store/auth.state';


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
