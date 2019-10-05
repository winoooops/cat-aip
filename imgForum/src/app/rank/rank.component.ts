import { Component, OnInit } from '@angular/core';
import{ImageService}from '../forums/services/image.service'
import {MatIconModule} from '@angular/material/icon'
//import { MatIconModule } from '../material-ui/material-ui.module'
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { EmojiDialogComponent} from '../emoji-dialog/emoji-dialog.component'
import { DialogComponent } from '../user/register/dialog/dialog.component';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss']
  // 
})

export class RankComponent implements OnInit {
  today: number = Date.now()
  ranks: string[]
 // message: string = ''
 // showEmojiPicker = false;
  
  constructor(private imageService: ImageService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getRanks()
  }

  getRanks(){
    return this.imageService.getRanks().subscribe(
      ranks => {
        console.log(ranks);
        ranks.forEach(e => {
          e.img.data.data = this.imageService.arrayBufferToBase64(e.img.data.data)
          
        });
        this.ranks = ranks
      }
    )
  }
  emojiDialog(){
    const dialogRef: MatDialogRef<EmojiDialogComponent> = this.dialog.open(EmojiDialogComponent,{
      width:"400px",
      data: {}
    })
    dialogRef.afterClosed().subscribe( result =>{
      console.log("Dialog Closed!")
    })
  }
  // emojiPicker(){
  //   this.showEmojiPicker = !this.showEmojiPicker;
  // }
  // addEmoji(event){
  //   const { message } = this;
  //   const text = `${message}${event.emoji.native}`;
  //   this.message = text;
  //   this.showEmojiPicker = false;

   
  // }
}
