import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { EmailDirective } from './validators/email.directive';


// something going on here
const userRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
]

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    EmailDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild( userRoutes ),
    MaterialUiModule
  ],
  exports: [
    RouterModule
  ]
})
export class UserModule { }
