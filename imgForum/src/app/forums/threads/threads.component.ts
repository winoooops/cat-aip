import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { arrayBufferToBase64 } from '../shared/convertB64'


@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss']
})
export class ThreadsComponent implements OnInit {
  idArr: String[]
  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.imageService.getImageId()
      .subscribe( r => {
        // only get the id of each documents
        
        this.idArr = r.map( doc => doc._id)
        console.log( this.idArr )

        // pass it down to child components
      })
  }

}
