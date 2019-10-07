import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() id: string
  idArr: string[]
  onlyShowTenComments: boolean = true
  constructor(
    private imageService: ImageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.imageService
      .getCommentImages(this.id)
      .subscribe( r => {
        this.idArr = r.map( doc => doc._id)
        console.log( this.idArr )
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

  showMoreComments() {
    this.onlyShowTenComments = !this.onlyShowTenComments 
    console.log( this.onlyShowTenComments || false  )
    // let the page rerender the remain child component 
  }


}
