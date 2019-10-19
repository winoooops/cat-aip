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
  comments: Thread[]
  tags: string[],
  imgSrc: string, 
  isRoot: boolean
}

export interface Comment {
  id: string, 
  author: string, 
  timestamp: string, 
  comments: Comment[], 
  tags: string[],
  imgSrc: string, 
  isRoot: boolean, 
  emoji: string, 
}


@Injectable({
  providedIn: 'root'
})



export class ImageService {
  
  private _data = new BehaviorSubject([])
  data = this._data.asObservable() 

  private _thread = new BehaviorSubject(undefined)
  thread = this._thread.asObservable() 

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

  loadThread(id){
    // travase throught the data array
    // find the items that has the exact _id 
    this.http.get<any>(`${SERVER_URL}/forums/${id}`)
      .subscribe( thread => {
        // update to the newest version 
        this._thread.next( thread )
      })

  }

  loadComment(id) {
    // Because there are going to be multiple comments with each possibily having multiple comments inside
    // I can not let the service to own the property of comment
    // have to passed from the commenet component's instance
    return this.http.get<any>(`${SERVER_URL}/forums/${id}`)
  }


  postThread(doc, cb) {
    this.http.post<any>(`${SERVER_URL}/forums/post`, doc)
      .subscribe( r => {
        console.log( r )
        // add the most recent post to the _data state
        this._data.next( r )
        cb() 
      })
  }

  loadComments(id) {
    this.http.get<any>(`${SERVER_URL}/forums/comment/${id}`)
      .subscribe( comments => {
        this._comments.next( comments )
      })
  }


  saveEmojiData(data){
    // dont need to use formdata this time,
    this.http.post<any>(`${SERVER_URL}/forums/emoji`, data, httpOptions)
      .subscribe( comment => {
        // add the most recenet emoji comment to the _comment state
        this._comments.next([...this._comments.value, comment ])
      })
  }
  // now that I've updated the comments, 
  changeEmojiData(data) {
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
