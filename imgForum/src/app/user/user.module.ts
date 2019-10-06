import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterialUiModule } from '../materials/material-ui.module';
import { EmailDirective } from './validators/email.directive';
import { UsernameDirective } from './validators/username.directive';
import { DialogComponent } from './register/dialog/dialog.component';
import { LogoutComponent } from './logout/logout.component';


// something going on here
const userRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
]

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    EmailDirective,
    UsernameDirective,
    DialogComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild( userRoutes ),
    MaterialUiModule
  ],
  exports: [
    RouterModule
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class UserModule { }
