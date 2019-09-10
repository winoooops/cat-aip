import { Component, OnInit} from '@angular/core';
import { ImageService, Image } from '../services/image.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.scss']
})
export class ForumsComponent implements OnInit {
  images: Image[]

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.imageService.getImageData()
      .subscribe( (images) => {
        this.images = images
        console.log( this.images )
      })
  }

}
