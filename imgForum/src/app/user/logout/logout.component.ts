import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from '../../data-sharing.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  curUrl : string = '';
  prevUrl : string = '';
  constructor(private router : Router, private dataSharingService: DataSharingService) {
    this.curUrl = this.router.url;
  }

  ngOnInit() {
    if (!localStorage.token) {
      alert("You haven't logged in!")
      this.router.navigate(['/user/login']);
    } else {
      localStorage.clear();
      alert("You have successfully logged out!");
      this.dataSharingService.isUserLoggedIn.next(false);
      this.router.navigate(['/user/login']);
    }
  }
}
