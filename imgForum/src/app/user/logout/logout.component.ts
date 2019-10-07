import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  curUrl : string = '';
  prevUrl : string = '';
  constructor(private router : Router, private userService: UserService) {
    this.curUrl = this.router.url;
  }

  ngOnInit() {
    if (!localStorage.id_token) {
      alert("You haven't logged in!")
      this.router.navigate(['/user/login']);
    } else {
      localStorage.clear();
      alert("You have successfully logged out!");
      this.router.navigate(['/user/login']);
    }
  }
}
