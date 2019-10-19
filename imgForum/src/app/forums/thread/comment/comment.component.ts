import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ImageService, Thread, Comment } from '../../services/image.service';
import { arrayBufferToBase64 } from '../../shared/convertB64';
import { EmojiDialogComponent } from '../emoji-dialog/emoji-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { relativeTimeThreshold } from 'moment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/user/services/user.service';



@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  // because the comment-content's card, by design, should not be clickable
  // so I won't be using routing here
  @Input() doc 
  comment: Comment
  isImage: boolean = false 
  imgSrc: string
  isCommentsViewable: boolean
  isMutable: boolean = false 
  constructor(
    private imageService: ImageService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef 
  ) { }
  
  ngOnInit() {
    // const forums_ali = this.route.snapshot.parent.params['forum_alias']
    // const thread_ali = this.route.snapshot.params['thread_alias']
    // this.url = `/forums/${forums_ali}/${thread_ali}`
    // console.log( this.url )
    // console.log( this.doc._id   )
    let imgSrc: string 
    let emoji: string
    if( this.doc.img ) {
      this.isImage = true
      const flag = `data:${this.doc.img.contentType};base64,`
      // convent the BSON to base64
      const imgStr = arrayBufferToBase64(this.doc.img.data.data)
      // comebine to a base64 string
      imgSrc = flag + imgStr
    }

    if( this.doc.emoji ) {
      this.isImage = false 
      emoji = this.doc.emoji
    }
    
    this.comment = {
      id: this.doc._id,
      author: this.doc.author,
      timestamp: this.doc.createAt, 
      comments: this.doc.comments,
      tags: this.doc.tags,
      imgSrc: imgSrc,
      emoji: emoji,
      isRoot: this.doc.isRoot, 
    }
  }

  replyImage() {
    this.router.navigate(['/forums/post'], {
      queryParams: {
        commentOn: this.comment.id
      }
    })
  }

  // toggleComment() {
  //   this.isCommentsViewable = !this.isCommentsViewable
  // }

  // openEmojiDialog() {
  //   let dialogRef = this.dialog.open(EmojiDialogComponent, {
  //     data: { "commentOn": this.id, isNew: true } 
  //   })

  //   dialogRef.afterClosed().subscribe(result => {
  //     // should refresh the parent 
  //   });
  // }

  // delete() {
  //   this.imageService
  //     .deleteDoc(this.docID)
  //     .subscribe( (r) => {
  //       location.reload() 
  //     })
  // }

  // change() {
  //   if ( !this.isImage ) {
  //     this.changeEmoji() 
  //   } else {
  //     this.changeImage()
  //   }
  // }


  // changeEmoji() {
  //   let dialogRef = this.dialog.open(EmojiDialogComponent, {
  //     data: { "id" : this.id, isNew: false }
  //   })
  // }


  // changeImage() {
  //   this.router.navigate(['forums/post'], {
  //     queryParams: {
  //       id: this.id,
  //       commentOn: this.thread_id
  //     }
  //   })
  // }
}
