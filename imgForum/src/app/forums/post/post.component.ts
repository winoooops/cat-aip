import { Component, OnInit } from '@angular/core';
import { ImageService, Image } from '../services/image.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{
  file 
  author: string
  imgPath:string
  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute  
  ) { }

  ngOnInit(){
    this.route.queryParams.subscribe( (params: Params) => {
      this.author = params['id']
    })
  }

  fileChange(element) {
    this.file = element.target.files[0]
    this.imgPath = this.file
    console.log( this.file )
  }


  onSubmit() {
    console.log( this.file )
    let formData: FormData = new FormData() 
    formData.append("image", this.file, this.file.name)
    // console.log( formData.get('image') )

    this.imageService
      .saveImageData(formData)
      .subscribe( r => {
        console.log( r )
      })
  }
}
