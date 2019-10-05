import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { arrayBufferToBase64 } from '../../shared/convertB64';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() id: string 
  imgSrc: string
  author: string
  tags: string[] 

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.imageService
      .getImageData(this.id)
      .subscribe( r => {
        const flag = `data:${r[0].img.contentType};base64,`
        // console.log( flag )

        // convent the BSON to base64
        const imgStr = arrayBufferToBase64(r[0].img.data.data)
        // console.log( imgStr )
        this.author = r[0].author
        this.tags = r[0].tags

        this.imgSrc = flag + imgStr
      })
  }

}
