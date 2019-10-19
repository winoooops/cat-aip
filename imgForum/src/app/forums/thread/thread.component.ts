import { Component, OnInit, Input, Inject, ChangeDetectorRef } from '@angular/core';
import { ImageService, Thread } from '../services/image.service';
import { arrayBufferToBase64 } from '../shared/convertB64'
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmojiDialogComponent } from './emoji-dialog/emoji-dialog.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
})
export class ThreadComponent implements OnInit {
  
  @Input() doc
  id
  interval
  thread: Thread 
  showEmojiPicker = false;
  isMutable: boolean = false 
  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // console.log( this.id )
    this.route.params.subscribe(params => {
      // if thread is open in threads' view, get Input() value, 
      // if the thread is open by itself via routing, get the paramaters

      // params['thread_alias'] ? this.id = params['thread_alias']: null; 
      
      this.id = params['thread_alias']
        

      // this.imageService.loadThread( this.id )
      this.imageService.loadThread( this.id )
      this.imageService.thread.subscribe( thread => {
          if( thread ) {
            // get the contentType
            const flag = `data:${thread.img.contentType};base64,`

            // convent the BSON to base64
            const imgStr = arrayBufferToBase64(thread.img.data.data)
            // comebine to a base64 string
            const imgSrc = flag + imgStr

            if( thread.author === localStorage.getItem('username')) {
              this.isMutable = true
            }

            this.thread = {
              id: this.id, 
              author: thread.author,
              tags: thread.tags, 
              timestamp: thread.createdAt,
              comments: thread.comments,
              imgSrc, 
              isRoot: thread.isRoot
            }
          }
          
        })

      this.interval = setInterval( () => {
        this.imageService.loadThread( this.id )
      }, 60000)
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    clearInterval(this.interval)
  }


  replyImage() {
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
    // from the thread component,  a user can only add emoji comment 
    const emojiDialog = this.dialog.open(EmojiDialogComponent, {
      data: { "commentOn": this.id, isNew: true } 
    })
    // emojiDialog
    //   .afterClosed()
    //   .subscribe( () => {
        
    //   })
  }

  delete() {
    // can be deletd with no image reply
    console.log( this.thread.comments )
    if( this.thread.comments.some( comment => comment.img )) {
      alert("You are not allowed to delete an image with image replies")
    } else {
      this.imageService.deleteDoc( this.id )
      .subscribe( r => {
        this.router.navigate(['forums/all'])
      })
    }
  }

  change() {
    const hasEmoji = this.thread.comments.some( comment => comment.emoji )
    const hasImage = this.thread.comments.some( comment => comment.img )

    // if the thread has emoji but not image reply, can not be changed 
    if( hasEmoji && !hasImage ) {
      alert("You can not allowed to change this image")
    } else {
      this.router.navigate(['forums/post'], {
        queryParams: {
          id: this.id
        }
    })  
   }
  }
}
