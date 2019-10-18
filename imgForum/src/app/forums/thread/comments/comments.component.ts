import { Component, OnInit, Input, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Router } from '@angular/router';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  commentRef: ComponentRef<CommentComponent>
  isNewest: boolean
  @Input() id: string
  idArr: string[]
  onlyShowTenComments: boolean = true
  constructor(
    private imageService: ImageService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.imageService
    //   .getCommentImages(this.id)
    //   .subscribe( r => {
    //     this.idArr = r.map( doc => doc._id)
    //     console.log( this.idArr )
    //   })
    this.imageService.loadComments( this.id )
    this.imageService.comments.subscribe( comments => {
      this.idArr = comments.map( comment => comment._id )
    })
  }

  showMoreComments() {
    this.onlyShowTenComments = !this.onlyShowTenComments 
    console.log( this.onlyShowTenComments || false  )
    // let the page rerender the remain child component 
  }

  reverseOrder() {
    this.isNewest = !this.isNewest 
    this.idArr = this.idArr.reverse()
  }
}
