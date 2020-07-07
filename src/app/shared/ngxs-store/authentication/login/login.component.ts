import { Component, OnInit } from '@angular/core';

import { Store } from '@ngxs/store'
import { Login } from '../authentication.state';

export class LoginRequest{
  username:string;
  password:string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store) { }

  loginRequest: LoginRequest = new LoginRequest();


  ngOnInit(): void {
  }

  authentication(){

    const authenticateUser = {
      username: this.loginRequest.username,
      password: this.loginRequest.password
    };
     this.store.dispatch(new Login(authenticateUser));
  }
}
