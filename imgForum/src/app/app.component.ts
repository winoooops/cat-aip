import { Component, OnInit } from '@angular/core';
import { DataSharingService } from './data-sharing.service';
import { UserService } from './user/services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isUserLoggedIn: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.isUserLoggedIn = this.userService.isLoggedIn() 
    console.log( this.isUserLoggedIn )
  }
  
}
