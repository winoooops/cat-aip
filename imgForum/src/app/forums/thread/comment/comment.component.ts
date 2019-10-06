import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { arrayBufferToBase64 } from '../../shared/convertB64';
import { EmojiDialogComponent } from '../emoji-dialog/emoji-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  counts: number
  isCommentsViewable: boolean = false
  constructor(
    private imageService: ImageService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.imageService
      .getDocData(this.id)
      .subscribe(doc => {
        const flag = `data:${doc.img.contentType};base64,`
        // console.log( flag )
        // convent the BSON to base64
        const imgStr = arrayBufferToBase64(doc.img.data.data)
        // console.log( imgStr )
        this.author = doc.author
        this.tags = doc.tags
        this.time = doc.createdAt
        this.counts = doc.counts
        this.imgSrc = flag + imgStr
      })
  }

  toggleComment() {
    this.isCommentsViewable = !this.isCommentsViewable
  }

  openEmojiDialog() {
    this.dialog.open(EmojiDialogComponent)
  }
}
