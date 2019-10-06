import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/forums/services/image.service';
import { arrayBufferToBase64 } from '../../forums/shared/convertB64'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  imgSrcArr: string[] = []
  constructor( private imageService: ImageService) { }

  ngOnInit() {
    this.imageService
      .getHotThreads()
      .subscribe( docArr => {
        docArr.forEach( doc => {
          this.imageService
            .getDocData( doc._id )
            .subscribe( doc => {
              const flag = `data:${doc.img.contentType};base64,`
              const imgStr = arrayBufferToBase64(doc.img.data.data)
              this.imgSrcArr.push(flag + imgStr)
            })
        })
      })
  }

}
