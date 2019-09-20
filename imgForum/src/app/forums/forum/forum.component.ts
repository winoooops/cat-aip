import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Forum } from 'src/app/services/data';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  forum: Forum
  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute  
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe( (params: Params) => {
      this.forum = this.imageService.forum( params['alias'])
    })
  }

}
