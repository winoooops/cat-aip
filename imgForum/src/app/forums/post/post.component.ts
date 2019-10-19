import { Component, OnInit, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { ImageService } from '../services/image.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes'
import { UserService } from 'src/app/user/services/user.service';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  file
  id: string 
  commentOn: string
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
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.commentOn = params['commentOn'] || ""
      this.id = params['id'] || ""
    })
  }

  fileChange(element) {
    this.file = element.target.files[0]
  }


  onSubmit() {
    if( this.file ) {
      let formData: FormData = new FormData()
      if( this.id !== "" ) {
        // if the user is just changing the image by updating with a new one
        formData.append("image", this.file, this.file.name)
        for(let i = 0 ; i < this.tags.length ; i ++ ) {
          formData.append('tags[]', this.tags[i])
        }

        this.imageService
          .changeImageData( formData, this.id )
          .subscribe( r => {
            if( this.commentOn === "") {
              this.router.navigateByUrl('forums/all')
            } else {
              this.router.navigateByUrl(`forums/all/${this.commentOn}`)
            }
          })
      } else {
        // if the user is posting a new image at the topic level
        formData.append("image", this.file, this.file.name)
        formData.append("author", localStorage.getItem('username'))
        formData.append("commentOn", this.commentOn)// add anchor where the comment holds
        for(let i = 0 ; i < this.tags.length ; i ++ ) {
          formData.append('tags[]', this.tags[i])
        }
        // formData.append('tags', this.tags)
        
        if( this.commentOn === '') {
          this.imageService.postThread(formData, () => {
            if( this.commentOn === "") {
              this.router.navigateByUrl('forums/all')
            } else {
              this.router.navigateByUrl(`forums/all/${this.commentOn}`)
            }
          })
        } else {
          this.imageService.postComment(formData, () => {
            if( this.commentOn === "") {
              this.router.navigateByUrl('forums/all')
            } else {
              this.router.navigateByUrl(`forums/all/${this.commentOn}`)
            }
          })
        }
        
      }
    } else {
      alert("Please selct an image first...")
    }
    
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


    console.log( this.tags )
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
