import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../services/user.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DialogComponent, UserID} from './dialog/dialog.component'

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


  constructor( 
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  onSubmit() {
    const userId = this.username 
    const pwd = this.password
    const email = this.email 
    const data: User = { userId, email, pwd }
    this.userService
      .register(data)
      .subscribe( (msg) => {
        console.log(msg)
        // if the msg is success, redirect the spa routing to user/login
        // * store the password and username in the sessionStorage 
        const dialogRef: MatDialogRef<DialogComponent> = this.dialog.open(DialogComponent, {
          width: "250px",
          data: { userId }
        })
      })
  } 
}
