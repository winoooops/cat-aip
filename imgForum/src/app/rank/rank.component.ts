import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss']
})
export class RankComponent implements OnInit {
  today: number = Date.now()

  constructor() { }

  ngOnInit() {
  }

}
