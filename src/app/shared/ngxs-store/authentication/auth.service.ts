import { Injectable } from "@angular/core";
import { HttpClient }  from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }


  login(payload: { username: string; password: string; }) {
    console.log("let me login ",payload)
      return this.http.post("http://localhost:8080/api/auth/login",payload);
  }

}
