import { Component } from '@angular/core';
import { LoginService, User } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // connecting to the backend stuff using fetch api
  username: string 
  password: string


  constructor( private loginService: LoginService) { }

  onSubmit() {
    const userId = this.username 
    const pwd = this.password

    const data: User = { userId, pwd }
    this.loginService
      .register(data)
      .subscribe( (msg) => {
        console.log(msg)
      })
  } 
}
