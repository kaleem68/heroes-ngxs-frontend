import { Injectable } from "@angular/core";
import { HttpClient }  from '@angular/common/http';

@Injectable()
export class AuthService {
  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }


  login(payload: { username: string; password: string; }) {
      return this.http.post("http://localhost:8080/api/auth/login",payload);
  }

}
