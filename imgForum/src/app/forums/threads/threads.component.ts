import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss']
})
export class ThreadsComponent implements OnInit {
  idArr: String[]
  id: string
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
