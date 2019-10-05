import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { arrayBufferToBase64 } from '../../shared/convertB64';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  // because the comment-content's card, by design, should not be clickable
  // so I won't be using routing here
  @Input() id: string 
  imgSrc: string
  author: string
  tags: string[] 
  time: string
  isCommentsViewable: boolean = true
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
        this.time = r[0].createdAt
        this.imgSrc = flag + imgStr
      })
  }

  toggleComment() {
    this.isCommentsViewable = !this.isCommentsViewable
  }

}
