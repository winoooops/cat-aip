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

  forum(forum_alias): Forum {
    // return the forum that matches the alias
    return this._data.find(row => {
      return row.alias = forum_alias
    })
  }

  saveEmojiData(data): Observable<any> {
    // dont need to use formdata this time,
    return this.http.post<any>(`${SERVER_URL}/forums/emoji`, data, httpOptions)
  }

  editEmojiData(data): Observable<any> {
    return this.http.put<any>(`${SERVER_URL}/forums/emoji`, data, httpOptions)
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
  // findone topic image's data by _id
  getDocData(id): Observable<any> {
    return this.http.get<any>(`${SERVER_URL}/forums/${id}`)
  }

  getComments(id): Observable<Array<any>> {
    return this.http.get<any>(`${SERVER_URL}/forums/comment/${id}`)
  }

  getHotThreads(): Observable<Array<any>> {
    return this.http.get<any>(`${SERVER_URL}/forums/hot-threads`)
  }

  getUserName() {
    return this.http.get(`${SERVER_URL}/user/username`, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

  deleteDoc(id) {
    return this.http.delete<any>(`${SERVER_URL}/forums/comment/${id}`)
  }

}
