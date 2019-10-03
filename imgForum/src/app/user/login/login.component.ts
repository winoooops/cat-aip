import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

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
    private router: Router  
  ) { }

  onSubmit() {
    this.userService.login({
      userId: this.username,
      password: this.password
    }).subscribe((res) =>{
      alert(res.id);
      this.router.navigate(['forums/post'], { queryParams: { id: res.id } })
    })
  }
}
