import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const SERVER_URL = "http://localhost:3000"

export interface User{
  userId: string, 
  pwd: string
}



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  register(data): Observable<any> {
    return this.http.post<any>(`${SERVER_URL}/user/login`,data)
  }
}
