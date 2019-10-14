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
      // load the whole data the first time, and save it in the service
      // I might consider not loading the whole data, but only the first dozens of data objects though
      this.imageService.loadAll(this.tag)
      this.imageService.data.subscribe( data => {
        console.log( data )
        this.idArr = data.map( doc => doc._id )
      })
    })
  }

}
