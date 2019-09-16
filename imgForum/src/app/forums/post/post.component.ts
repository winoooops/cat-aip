import { Component, OnInit } from '@angular/core';
import { ImageService, Image } from '../services/image.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{
  url: string
  author: string

  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute  
  ) { }

  ngOnInit(){
    this.route.queryParams.subscribe( (params: Params) => {
      this.author = params['id']
    })
  }


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
