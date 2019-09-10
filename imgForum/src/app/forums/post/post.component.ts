import { Component } from '@angular/core';
import { ImageService, Image } from '../services/image.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent{
  url: string
  author: string

  constructor(private imageService: ImageService) { }

  onSubmit() {
    const url = this.url
    const author = this.author

    const newImg: Image = {
      url, 
      author
    }

    this.imageService.saveImageData(newImg)
      .subscribe( (r) => {
        console.log(r)
      })
  }

}
