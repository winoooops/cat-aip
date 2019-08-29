import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';


const routes: Routes = [
  { path: 'forums', loadChildren: 'src/app/forums/forums.module#ForumsModule' },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/forums', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
