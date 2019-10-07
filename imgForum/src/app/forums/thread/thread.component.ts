import { Component, OnInit, Input, Inject } from '@angular/core';
import { ImageService } from '../services/image.service';
import { arrayBufferToBase64 } from '../shared/convertB64'
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmojiDialogComponent } from './emoji-dialog/emoji-dialog.component';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
})
export class ThreadComponent implements OnInit {
  @Input() id: string
  _id: string
  isImage: boolean
  isCommentsViewable: boolean = false
  showEmojiPicker = false;
  emoji: string
  imgSrc: string
  author: string
  username: string
  tags: string[]
  time: string
  counts: number
  isContentDeletable: boolean = false
  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    // console.log( this.id )
    this.username = localStorage.getItem('username')
    this.route.params.subscribe(params => {
      // if thread is open in threads' view, get Input() value,
      // if the thread is open by itself via routing, get the paramaters

      // params['thread_alias'] ? this.id = params['thread_alias']: null; 
      if (params['thread_alias']) {
        this.id = params['thread_alias']
        this.isCommentsViewable = true
      }


      this.imageService.getDocData(this.id)
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
            console.log(doc.emoji)
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
    })
  }


  addComment() {
    console.log(this.id)
    this.router.navigate(['/forums/post'], {
      queryParams: {
        commentOn: this.id
      }
    })
  }

  // parts of the code below is inspired by https://pusher.com/tutorials/emoji-gifs-link-previews-angular-chatroom
  // toggleEmojiPicker() {
  //   this.showEmojiPicker = !this.showEmojiPicker 
  //   console.log( this.showEmojiPicker )
  // } 

  openEmojiDialog() {
    this.dialog.open(EmojiDialogComponent, {
      data: { "commentOn": this.id }
    })
  }

}
