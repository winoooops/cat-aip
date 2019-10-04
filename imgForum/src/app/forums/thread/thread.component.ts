import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from '../services/image.service';
import { arrayBufferToBase64 } from '../shared/convertB64'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {
  @Input() id: string
  imgSrc: string
  author: string
  tags: string[] 
  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // console.log( this.id )
    this.route.params.subscribe( params => {
      // if thread is open in threads' view, get Input() value,
      // if the thread is open by itself via routing, get the paramaters
      params['thread_alias'] ? this.id = params['thread_alias']: null; 
      this.imageService.getImageData(this.id)
      .subscribe(r => {
        // console.log( r )
        // get the contentType
        const flag = `data:${r[0].img.contentType};base64,`
        // console.log( flag )

        // convent the BSON to base64
        const imgStr = arrayBufferToBase64(r[0].img.data.data)
        // console.log( imgStr )
        this.author = r[0].author
        this.tags = r[0].tags
        this.imgSrc = flag + imgStr
        // console.log(this.imgSrc)
      })
    })
  }


  addComment() {
    console.log( this.id )
    this.router.navigate(['/forums/post'], {
      queryParams: {
        commentOn: this.id
      }
    })
  }
}
