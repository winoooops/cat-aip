import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toEmoji'
})
export class ToEmojiPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    // the idea of transfering a string to emoji was inspired by https://medium.com/@allegra9/add-emoji-picker-to-your-react-chat-app-30d8cbe8d9a6
    if( value ) {
      const codesArray = []
      const point = '0x'+ value 
      codesArray.push( point )
      return String.fromCodePoint(...codesArray )
    }
    
}
}
