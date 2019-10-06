import { Component, OnInit, Input, Inject } from '@angular/core';
import { ImageService } from '../services/image.service';
import { arrayBufferToBase64 } from '../shared/convertB64'
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from '../shared/moment.pipe';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmojiDialogComponent } from './emoji-dialog/emoji-dialog.component';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
})
export class ThreadComponent implements OnInit {
  @Input() id: string
  isCommentsViewable: boolean = false
  showEmojiPicker = false;
  imgSrc: string
  author: string
  tags: string[]
  time: string
  counts: number
  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    // console.log( this.id )
    this.route.params.subscribe(params => {
      // if thread is open in threads' view, get Input() value,
      // if the thread is open by itself via routing, get the paramaters

      // params['thread_alias'] ? this.id = params['thread_alias']: null; 
      if (params['thread_alias']) {
        this.id = params['thread_alias']
        this.isCommentsViewable = true
      }


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
          this.tags = r[0].tags
          this.time = r[0].createdAt
          this.counts = r[0].counts
          console.log(this.counts)
          this.imgSrc = flag + imgStr
          // console.log(this.imgSrc)
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
    this.dialog.open(EmojiDialogComponent)
  }

}
