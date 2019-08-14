import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { ForumsComponent } from './forums.component';
import { Routes, RouterModule } from '@angular/router'
import { ForumComponent } from '../forum/forum.component';
import { ForumPostComponent } from '../forum-post/forum-post.component';

const routes: Routes = [
  { path: '', component: ForumsComponent }, 
  { path: ':forum_id', component: ForumComponent },
  { path: 'add', component: ForumPostComponent}
]


@NgModule({
  declarations: [
    ForumsComponent,
    ForumComponent,
    ForumPostComponent
  ],
  imports: [
    RouterModule.forChild( routes )
  ],
  exports:[
    RouterModule
  ]
})
export class ForumsModule { }
