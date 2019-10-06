import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data, Forum } from '../../services/data'

const SERVER_URL = "http://localhost:3000"

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // "Access-Control-Allow-Origin": "*"
  })
};



//define a dummy forums dataset

export interface Image {
  image: File,
  author: string
}


@Injectable({
  providedIn: 'root'
})



export class ImageService {
  private _data = Data

  constructor(private http: HttpClient) { }


  forums(): Forum[] {
    return this._data
  }

  forum(forum_alias): Forum{
    // return the forum that matches the alias
    return this._data.find( row => {
      return row.alias = forum_alias
    })
  }

  saveEmojiData(data): Observable<any>{
    // dont need to use formdata this time,
    return this.http.post<any>(`${SERVER_URL}/forums/emoji`, data, httpOptions)
  }

  saveImageData(data): Observable<any> {
    return this.http.post<any>(`${SERVER_URL}/forums/post`, data)
  }

  getImageId(): Observable<Array<any>> {
    return this.http.get<any>(`${SERVER_URL}/forums/`)
  }

  getImageIdByTag(tag): Observable<Array<any>> {
    return this.http.get<any>(`${SERVER_URL}/forums/tags/${tag}`)
  }

  getImageData(id): Observable<any>{
    return this.http.get<any>(`${SERVER_URL}/forums/${id}`)
  }

  getCommentImages(id): Observable<Array<any>> {
    return this.http.get<any>(`${SERVER_URL}/forums/comment/${id}`)
  }

  getUserName() {
    return this.http.get(`${SERVER_URL}/user/username`, {
      observe : 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
}
