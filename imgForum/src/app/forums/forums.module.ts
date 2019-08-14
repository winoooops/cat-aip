import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumsComponent } from './forums.component';
import { Routes, RouterModule } from '@angular/router'
import { ForumComponent } from '../forum/forum.component';

const routes: Routes = [
  { path: '', component: ForumsComponent }, 
  { path: ':forum_id', component: ForumComponent }
]


@NgModule({
  declarations: [ForumsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild( routes )
  ]
})
export class ForumsModule { }
