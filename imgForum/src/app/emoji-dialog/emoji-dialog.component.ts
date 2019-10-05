import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import '../../../node_modules/@ctrl/ngx-emoji-mart/picker.css'

@Component({
  selector: 'app-emoji-dialog',
  templateUrl: './emoji-dialog.component.html',
  styleUrls: ['./emoji-dialog.component.scss']
})
export class EmojiDialogComponent implements OnInit {

  message: string = ''
  showEmojiPicker = false;
  constructor(public dialogRef: MatDialogRef<EmojiDialogComponent>) { }

  ngOnInit() {
  }
  emojiPicker(){
    this.showEmojiPicker = !this.showEmojiPicker;
  }
  addEmoji(event){
    const { message } = this;
    const text = `${message}${event.emoji.native}`;
    this.message = text;
    this.showEmojiPicker = false;

  }
  onNoClick(){
    this.dialogRef.close() 
  }
  onSendClick(){
    
  }
}
