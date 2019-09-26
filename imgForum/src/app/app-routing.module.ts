import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//test

const routes: Routes = [
  { path: 'forums', loadChildren: 'src/app/forums/forums.module#ForumsModule' },
  { path: 'user', loadChildren: 'src/app/user/user.module#UserModule'},
  { path: '', redirectTo: '/forums', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
