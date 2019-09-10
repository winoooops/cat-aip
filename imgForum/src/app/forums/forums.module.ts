import { NgModule } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { ForumsComponent } from './forums/forums.component';
import { Routes, RouterModule } from '@angular/router'
import { ForumComponent } from './forum/forum.component';
// import { ForumPostComponent } from './forum-post/forum-post.component';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { ThreadsComponent } from './threads/threads.component';
import { ThreadComponent } from './thread/thread.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  { path: 'post', component: PostComponent },
  { path: ':forum_alias', component: ForumComponent },
  { path: '', component: ForumsComponent },
]


@NgModule({
  declarations: [
    ForumsComponent,
    ForumComponent,
    // ForumPostComponent,
    ThreadsComponent,
    ThreadComponent,
    PostComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MaterialUiModule
  ],
  exports: [
    RouterModule
  ]
})
export class ForumsModule { }
