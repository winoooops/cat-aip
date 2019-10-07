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
  isCommentsViewable: boolean = false
  showEmojiPicker = false;
  imgSrc: string
  author: string
  tags: string[]
  time: string
  counts: number
  isMutable: boolean = false 
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


      this.imageService.getDocData(this.id)
        .subscribe(doc => {
          // console.log( r )
          // get the contentType
          const flag = `data:${doc.img.contentType};base64,`
          // console.log( flag )

          // convent the BSON to base64
          const imgStr = arrayBufferToBase64(doc.img.data.data)
          // console.log( imgStr )
          this.author = doc.author

          if( this.author === localStorage.getItem('username') ) {
            this.isMutable = true 
          }
          this.tags = doc.tags
          this.time = doc.createdAt
          this.counts = doc.counts
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
    this.dialog.open(EmojiDialogComponent, {
      data: { "commentOn": this.id } 
    })
  }

  delete() {
    this.imageService.deleteDoc( this.id )
      .subscribe( r => {
        this.router.navigate(['forums/all'])
      })
  }
}
