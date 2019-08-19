import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';

@Component({
  selector: 'app-forum-post',
  templateUrl: './forum-post.component.html',
  styleUrls: ['./forum-post.component.scss']
})
export class ForumPostComponent {
  userID: string = '001'
  uploadResponse = { status: '', message: '', filePath: '' };
  error: string
  constructor(private postService: PostService) { }

  onSubmit(e) {
    const formData = new FormData()
    this.postService.upload(formData, this.userID)
      .subscribe(
        res => this.uploadResponse = res,
        err => this.error = err
      )
  }
}
