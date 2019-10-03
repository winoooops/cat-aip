import { Component } from '@angular/core';
import { DataSharingService } from './data-sharing.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isUserLoggedIn: boolean = false;

  constructor(private dataSharingService: DataSharingService) {
    this.dataSharingService.isUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
    });
  }
  title = 'imgForum';
}
