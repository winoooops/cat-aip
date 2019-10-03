import { Component, OnInit, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { ImageService, Image } from '../services/image.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes'


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  file
  author: string
  tags: string[] = ["cats", "films", "wallpaper"]
  tagProps  = {
    visible: true, 
    selectable: true,
    removable: true,
    addOnBlur: true
  }
  separatorKeysCodes: number[] = [ENTER, COMMA]

  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.author = params['id']
    })
  }

  fileChange(element) {
    this.file = element.target.files[0]
    console.log(this.file)
  }


  onSubmit() {
    console.log(this.file)
    let formData: FormData = new FormData()
    formData.append("image", this.file, this.file.name)
    formData.append("author", this.author)
    for(let i = 0 ; i <= this.tags.length ; i ++ ) {
      formData.append('tags[]', this.tags[i])
    }
    // formData.append('tags', this.tags)



    console.log(formData.get('image'))
    console.log(formData.get('author'))

    this.imageService
      .saveImageData(formData)
      .subscribe(r => {
        console.log(r)
      })
  }

  add(event: MatChipInputEvent) {
    const input = event.input
    const value = event.value

    // add the tag once the input is completed 
    if( (value || '').trim() ) {
      this.tags.push( value.trim() )
    } 

    // reset the input value 
    if( input ) {
      input.value = ''
    }


  }

  remove(tag: string) {
    console.log(`${tag} tag has been deleted...`)
    const index = this.tags.indexOf(tag)
    if( index >= 0 ) {
       this.tags.splice(index, 1)
    }
    // console.log( this.tags )
  }

}
