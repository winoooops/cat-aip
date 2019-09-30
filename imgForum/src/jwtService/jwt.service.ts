import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

const SERVER_URL = "http://localhost:3000"

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private httpClient: HttpClient) { }

  login(data) {
    return this.httpClient.post<{access_token:  string}>(`${SERVER_URL}/user/signin`, data).pipe(tap(res => 
      {localStorage.setItem('access_token', res.access_token);}))
  }

  register(data) {
    return this.httpClient.post<{access_token: string}>(`${SERVER_URL}/user/register`, data).pipe(tap(res => 
      {this.login(data)}))
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean{
    return localStorage.getItem('access_token') !==  null;
  }
  
}
