import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  // connecting to the backend stuff using fetch api
  username: string 
  password: string
  passwordConfirm: string
  email: string


  constructor( private userService: UserService) { }

  onSubmit() {
    const userId = this.username 
    const pwd = this.password
    const email = this.email 
    const data: User = { userId, email, pwd }
    this.userService
      .register(data)
      .subscribe( (msg) => {
        console.log(msg)
      })
  } 
}