import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from '../../services/image.service';
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
  @Input() id: string
  isImage: boolean
  imgSrc: string
  author: string
  tags: string[]
  time: string
  counts: number
  emoji: string 
  url: string
  isCommentsViewable: boolean = false
  isMutable: boolean = false 
  constructor(
    private imageService: ImageService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }
  
  ngOnInit() {
    // const forums_ali = this.route.snapshot.parent.params['forum_alias']
    // const thread_ali = this.route.snapshot.params['thread_alias']
    // this.url = `/forums/${forums_ali}/${thread_ali}`
    // console.log( this.url )
    
    this.imageService
      .getDocData(this.id)
      .subscribe(doc => {
        if( doc.author === localStorage.getItem('username')) {
          this.isMutable = true;
        }
        if( doc.img ) {
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
        this.tags = doc.tags
        this.time = doc.createdAt
      })
  }

  toggleComment() {
    this.isCommentsViewable = !this.isCommentsViewable
  }

  openEmojiDialog() {
    let dialogRef = this.dialog.open(EmojiDialogComponent, {
      data: { "commentOn": this.id, } 
    })

    dialogRef.afterClosed().subscribe(result => {
      // should refresh the parent 
    });
  }
}
