import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from '../services/image.service';
import { arrayBufferToBase64 } from '../shared/convertB64'

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {
  @Input() id: string
  imgSrc: string
  author: string
  constructor(private imageService: ImageService) { }

  ngOnInit() {
    // console.log( this.id )
    this.imageService.getImageData(this.id)
      .subscribe(r => {
        // console.log( r )
        // get the contentType
        const flag = `data:${r[0].img.contentType};base64,`
        // console.log( flag )

        // convent the BSON to base64
        const imgStr = arrayBufferToBase64(r[0].img.data.data)
        // console.log( imgStr )
        this.author = r[0].author

        this.imgSrc = flag + imgStr
        // console.log(this.imgSrc)
      })
  }

}
