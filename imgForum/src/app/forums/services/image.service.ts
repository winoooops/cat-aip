import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const SERVER_URL = "http://localhost:3000"

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // "Access-Control-Allow-Origin": "*"
  })
};


export interface Image {
  url: string, 
  author: string
}


@Injectable({
  providedIn: 'root'
})



export class ImageService {
  constructor(private http: HttpClient) { }

  saveImageData(data): Observable<Image> {
    return this.http.post<any>(`${SERVER_URL}/forums/post`, data, httpOptions)
  }

  getImageData(): Observable<Array<Image>> {
    return this.http.get<any>(`${SERVER_URL}/forums/`, httpOptions)
  }
}
