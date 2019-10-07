import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../../data-sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // connecting to the backend stuff using fetch api
  username: string
  password: string

  constructor(
    private userService: UserService,
    private router: Router, 
    private dataSharingService: DataSharingService
  ) { 
    if (localStorage.id_token) {
      alert("You have already signed in!")
      this.router.navigate(['/forums/post']);
    }
  }

  onSubmit() {
    this.userService.login({
      userId: this.username,
      password: this.password
    }).subscribe( (auth) => {
      this.userService.setSession( auth )
      this.router.navigate(['/forums/all']);
    });
  }

}
