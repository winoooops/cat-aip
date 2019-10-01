import { Component, OnInit } from '@angular/core';
import { ImageService, Image } from '../services/image.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{
  file 
  author: string

  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute,   
    private router : Router
  ) {
    if (!localStorage.token) {
      console.log("here"!);
      this.router.navigate(['/user/login']);
    }
   }
  ngOnInit(){
    this.route.queryParams.subscribe( (params: Params) => {
      this.author = params['id']
    })
  }

  fileChange(element) {
    this.file = element.target.files[0]
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
