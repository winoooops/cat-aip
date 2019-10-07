import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { arrayBufferToBase64 } from '../../shared/convertB64';
import { EmojiDialogComponent } from '../emoji-dialog/emoji-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  // because the comment-content's card, by design, should not be clickable
  // so I won't be using routing here
  @Input() id: string
  _id: string
  isImage: boolean
  imgSrc: string
  author: string
  username: string
  tags: string[]
  time: string
  counts: number
  emoji: string
  isCommentsViewable: boolean = false
  isContentDeletable: boolean = false
  constructor(
    private imageService: ImageService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {

    this.username = localStorage.getItem('username')
    this.imageService
      .getDocData(this.id)
      .subscribe(doc => {
        this._id = doc._id
        if (doc.img) {
          this.isImage = true
          // get the contentType 
          const flag = `data:${doc.img.contentType};base64,`
          // convent the BSON to base64
          const imgStr = arrayBufferToBase64(doc.img.data.data)
          this.imgSrc = flag + imgStr
        } else {
          this.isImage = false
          this.emoji = doc.emoji
        }
        // console.log( imgStr )
        this.counts = doc.counts
        this.author = doc.author
        // 
        if (this.username === this.author) {
          this.isContentDeletable = true
        }

        this.tags = doc.tags
        this.time = doc.createdAt
      })
  }

  toggleComment() {
    this.isCommentsViewable = !this.isCommentsViewable
  }

  openEmojiDialog() {
    this.dialog.open(EmojiDialogComponent, {
      data: {
        "commentOn": this.id,
      }
    })
  }

  editEmoji() {
    this.dialog.open(EmojiDialogComponent, {
      data: { "id": this._id }
    })
  }

  delete() {
    this.imageService
      .deleteDoc(this._id)
      .subscribe(() => {
        this.router.navigateByUrl(this.router.url)
      })

  }
}
