import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpEventType, HttpErrorResponse } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  SERVER_URL: string = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  upload(data, userId) {
    let UPLOAD_URL: string = `${this.SERVER_URL}/auth/${userId}/img`;


    // the code snipper below is from https://www.techiediaries.com/angular-file-upload-progress-bar/
    return this.http.post<any>(UPLOAD_URL, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }
}
