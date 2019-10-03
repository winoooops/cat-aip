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
    if (localStorage.token) {
      alert("You have already signed in!")
      this.router.navigate(['/forums/post']);
    }
  }

  onSubmit() {
    this.userService.login({
      userId: this.username,
      password: this.password
    }).subscribe(
      data => {
        // Log in successful
        if (data.token) {
          localStorage.setItem('token', data.token);
          this.dataSharingService.isUserLoggedIn.next(true);
          this.router.navigate(['forums/post'], { queryParams: { id: data.id } })  
        } else {
          alert("Wrong password or username!");
        }
      },
      error => {
        alert("Error occurred!");
      }
    );
  }

}
