import { Component, OnInit } from '@angular/core';
import { ImageService, Image } from '../services/image.service';
import { Forum } from 'src/app/services/data';

@Component({
  selector: 'app-forum',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.scss']
})
export class ForumsComponent implements OnInit {
  images: Image[]
  forums: Forum[]

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.forums = this.imageService.forums()
  }

}
