import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Data, Forum } from '../../services/data'
import { CdkAccordion } from '@angular/cdk/accordion';

const SERVER_URL = "http://localhost:3000"

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // "Access-Control-Allow-Origin": "*"
  })
};

export interface Thread {
  id: string, 
  author: string, 
  timestamp: string, 
  counts: string, 
  tags: string[],
  imgSrc: string, 
  isRoot: boolean
}

export interface Comment {

}


@Injectable({
  providedIn: 'root'
})



export class ImageService {
  private _data = new BehaviorSubject([])
  data = this._data.asObservable() 

  private _comments = new BehaviorSubject([])
  comments = this._comments.asObservable() 
  
  constructor(private http: HttpClient) { }

  loadAll(tag) {
    this.http.get<any>(`${SERVER_URL}/forums/tags/${tag}`)
      .subscribe( data => {
      // it seems like the behaviorsubject is store the data basesd on previous records
      // instaed of loading 
        this._data.next( data )
      })
  }

  loadThread(id): Observable<any>{
    // travase throught the data array
    // find the items that has the exact _id 
    console.log( this._data.value )
    return this.http.get<any>(`${SERVER_URL}/forums/${id}`)
  }

  postThread(doc, cb) {
    this.http.post<any>(`${SERVER_URL}/forums/post`, doc)
      .subscribe( r => {
        this._data.next([...this._data.value, r ])
        cb() 
      })
  }

  loadComments(id) {
    this.http.get<any>(`${SERVER_URL}/forums/comment/${id}`)
      .subscribe( comments => {
        this._comments.next( comments )
      })
  }


  saveEmojiData(data): Observable<any>{
    // dont need to use formdata this time,
    return this.http.post<any>(`${SERVER_URL}/forums/emoji`, data, httpOptions)
  }

  changeEmoji(data) {
    return this.http.put<any>(`${SERVER_URL}/forums/emoji-change`, data, httpOptions)
  }

  saveImageData(data): Observable<any> {
    return this.http.post<any>(`${SERVER_URL}/forums/post`, data)
  }

  changeImageData(data, id): Observable<any> {
    return this.http.put<any>(`${SERVER_URL}/forums/${id}`, data)
  }

  getImageId(): Observable<Array<any>> {
    return this.http.get<any>(`${SERVER_URL}/forums/`)
  }

  getImageIdByTag(tag): Observable<Array<any>> {
    return this.http.get<any>(`${SERVER_URL}/forums/tags/${tag}`)
  }
  // findone topic image's data by _id
  getDocData(id): Observable<any>{
    return this.http.get<any>(`${SERVER_URL}/forums/${id}`)
  }

  getCommentImages(id): Observable<Array<any>> {
    return this.http.get<any>(`${SERVER_URL}/forums/comment/${id}`)
  }

  getHotThreads(): Observable<Array<any>>{
    return this.http.get<any>(`${SERVER_URL}/forums/hot-threads`)
  }

  getUserName() {
    return this.http.get(`${SERVER_URL}/user/username`, {
      observe : 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

  deleteDoc(id) {
    return this.http.delete<any>(`${SERVER_URL}/forums/${id}`)
  }

  
}
