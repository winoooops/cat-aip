import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'forums', loadChildren: 'src/app/forums/forums.module#ForumsModule' },
  { path: 'user', loadChildren: 'src/app/user/user.module#UserModule'},
  { path: '', redirectTo: '/forums/all', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
