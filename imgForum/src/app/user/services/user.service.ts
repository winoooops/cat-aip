import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

export interface User {
  userId: string,
  email: string
  pwd: string
}


const SERVER_URL = "http://localhost:3000"

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'credentials': 'include'
  }),
};



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(data): Observable<any> {
    // console.log(this.http.post<any>(`${SERVER_URL}/user/register`, data, httpOptions));
    return this.http.post<any>(`${SERVER_URL}/user/register`, data, httpOptions)
  }

  login(data): Observable<any> {
    return this.http.post<any>(`${SERVER_URL}/user/signin`, data, httpOptions)
  }
  // parts of the code below is from https://blog.angular-university.io/angular-jwt-authentication/
  setSession(res) {
    console.log(res)
    const expiresIn = Number(res.expiresIn.substring(0, 1))
    const expiresAt = moment().add(expiresIn, 'h');
    localStorage.setItem('id_token', res.token)
    localStorage.setItem('expiresAt', JSON.stringify(expiresAt))
    localStorage.setItem('username', res.username)
  }

  logOut() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('expiresAt')
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration())
  }

  isLoggedOut() {
    return !this.isLoggedIn()
  }

  getExpiration() {
    const expiration = localStorage.getItem('expiresAt')
    const expiresAt = JSON.parse(expiration)
    return moment(expiresAt)
  }
}
