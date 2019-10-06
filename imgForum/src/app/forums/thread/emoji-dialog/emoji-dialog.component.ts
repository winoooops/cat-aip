import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog' 




@Component({
  selector: 'app-emoji-dialog',
  templateUrl: './emoji-dialog.component.html',
  styleUrls: ['./emoji-dialog.component.scss']
})
export class EmojiDialogComponent {
  message: string = ""
  // part of the code below (function addEmoji() ) is from https://pusher.com/tutorials/emoji-gifs-link-previews-angular-chatroom
  constructor(
    public dialogRef: MatDialogRef<EmojiDialogComponent>
  ) { }

  addEmoji(event) {
    const { message } = this;
    const text = `${message}${event.emoji.native}`;
    this.message = text;
    console.log( this.message )
    this.dialogRef.close()
  }
}
