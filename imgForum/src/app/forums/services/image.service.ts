import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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


  saveImageData(data): Observable<any> {
    console.log(data.get('image'))
    return this.http.post<any>(`${SERVER_URL}/forums/post`, data)
  }

  getImageId(): Observable<Array<any>> {
    return this.http.get<Forum[]>(`${SERVER_URL}/forums/`)
  }

  getImageData(id): Observable<any>{
    return this.http.get<any>(`${SERVER_URL}/forums/${id}`)
  }
  arrayBufferToBase64(buffer){
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) =>binary +=String.fromCharCode(b));
    return window.btoa(binary);
  }
}