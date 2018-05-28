import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly token_endpoint = "/api/login";
  readonly register_endpoint = "/api/register";
  token : string;

  constructor(private http: HttpClient) { }

  isTokenEndpoint(route) {
    return route.startsWith(this.token_endpoint) ||  route.startsWith(this.register_endpoint);
  }

  getToken() {
    return this.token;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  isLoggedIn() : boolean {
    if(this.token != null) {
      return true;
    } else {
      let storedToken = localStorage.getItem('token');
      if(storedToken != null) {
        this.token = storedToken;
        return true
      }
    }
    return false;
  }

  login(username: string, password: string) : Observable<any> {
    return this.http.post('/api/login', {username:username, password:password});
  }

  register(username: string, password: string) : Observable<any> {
    return this.http.post('/api/registration', {username:username, password:password});
  }

}
