import { Component, OnInit, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { ImageService, Image } from '../services/image.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes'



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  file
  commentOn: string
  author: string
  tags: string[] = ["cats", "films", "wallpaper"]
  tagProps = {
    visible: true,
    selectable: true,
    removable: true,
    addOnBlur: true
  }
  separatorKeysCodes: number[] = [ENTER, COMMA]

  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.author = localStorage.getItem('username')
      this.commentOn = params['commentOn'] || ""
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
    formData.append("commentOn", this.commentOn)// add anchor where the comment holds
    for (let i = 0; i < this.tags.length; i++) {
      formData.append('tags[]', this.tags[i])
    }
    // formData.append('tags', this.tags)



    console.log(formData.get('image'))
    console.log(formData.get('author'))

    this.imageService
      .saveImageData(formData)
      .subscribe(r => {
        if (this.commentOn === "") {
          this.router.navigateByUrl('forums/all')
        } else {
          this.router.navigateByUrl(`forums/all/${this.commentOn}`)
        }

      })
  }

  add(event: MatChipInputEvent) {
    const input = event.input
    const value = event.value

    // add the tag once the input is completed 
    if ((value || '').trim()) {
      this.tags.push(value.trim())
    }

    // reset the input value 
    if (input) {
      input.value = ''
    }


    console.log(this.tags)
  }

  remove(tag: string) {
    console.log(`${tag} tag has been deleted...`)
    const index = this.tags.indexOf(tag)
    if (index >= 0) {
      this.tags.splice(index, 1)
    }
    // console.log( this.tags )
  }

}
