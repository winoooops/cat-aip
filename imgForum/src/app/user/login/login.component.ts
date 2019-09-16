import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // connecting to the backend stuff using fetch api
  username: string
  password: string


  constructor(private userService: UserService) { }

  onSubmit() {
    this.userService.login({
      userId: this.username,
      password: this.password
    }).subscribe((res) =>
      alert(res.id)
    )
  }
}
