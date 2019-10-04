import { Component, OnInit } from '@angular/core';
import{ImageService}from '../forums/services/image.service'
@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss']
})
export class RankComponent implements OnInit {
  today: number = Date.now()
  ranks: string[]
  
  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.getRanks()
  }

  getRanks(){
    return this.imageService.getRanks().subscribe(
      ranks => {
        console.log(ranks);
        ranks.forEach(e => {
          e.img.data.data = this.imageService.arrayBufferToBase64(e.img.data.data)
          
        });
        this.ranks = ranks
      }
    )
  }
}
