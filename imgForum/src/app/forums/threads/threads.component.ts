import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss']
})
export class ThreadsComponent implements OnInit {
  idArr: String[]
  id: string
  tag: string 

  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute,  
  ) { }

  ngOnInit() {
    this.route.params.subscribe( (params: Params) => {
      this.tag = this.route.snapshot.parent.params["forum_alias"]
      this.imageService.getImageIdByTag( this.tag )
      .subscribe( r => {
        // only get the id of each documents
        
        this.idArr = r.map( doc => doc._id)

        // pass it down to child components
      })
    })






    
  }

}
