import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { ActivatedRoute, Params } from '@angular/router';
import { arrayBufferToBase64 } from '../shared/convertB64'

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss']
})
export class ThreadsComponent implements OnInit {
  idArr: String[]
  threads 
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

        if( data ) {
          this.threads = data.map( doc => {
            const id = doc._id
            const flag = `data:${doc.img.contentType};base64,`

            // convent the BSON to base64
            const imgStr = arrayBufferToBase64(doc.img.data.data)
            // comebine to a base64 string
            const imgSrc = flag + imgStr
            const timestamp = doc.createAt
            const author = doc.author
            return { id, imgSrc, author, timestamp }
          })  
        }
      })
    })
  }

}
