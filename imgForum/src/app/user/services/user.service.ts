import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User{
  userId: string, 
  email: string
  pwd: string
}


const SERVER_URL = "http://localhost:3000"

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(data): Observable<any> {
    return this.http.post<any>(`${SERVER_URL}/user/login`, data, httpOptions)
  }
}
