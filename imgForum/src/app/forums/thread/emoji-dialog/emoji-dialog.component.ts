import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog' 
import { ImageService } from '../../services/image.service';

export interface ImageID {
  commentOn: string,
  id: string,
  isNew: boolean
}


@Component({
  selector: 'app-emoji-dialog',
  templateUrl: './emoji-dialog.component.html',
  styleUrls: ['./emoji-dialog.component.scss']
})
export class EmojiDialogComponent {
  code: string = ""
  commentOn: string 
  author: string 
  // part of the code below (function addEmoji() ) is from https://pusher.com/tutorials/emoji-gifs-link-previews-angular-chatroom
  constructor(
    private imageService: ImageService,
    public dialogRef: MatDialogRef<EmojiDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImageID
  ) { }

  addEmoji(event) {
    this.code = event.emoji.unified
    this.commentOn = this.data.commentOn
    this.author = localStorage.getItem('username')

    if( this.data.isNew  ) {
      this.imageService
      .saveEmojiData( { "code": this.code, "commentOn": this.commentOn, "author": this.author } )
      .subscribe( r => {
        console.log( r )
      })
    } else {
      this.imageService
        .changeEmoji( { "code": this.code, "id": this.data.id })
        .subscribe( r => {
          console.log(r)
        })
    }
    this.dialogRef.close()
  }
}
