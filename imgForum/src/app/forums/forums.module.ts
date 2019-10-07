import { NgModule } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { ForumComponent } from './forum/forum.component';
// import { ForumPostComponent } from './forum-post/forum-post.component';
import { MaterialUiModule } from '../materials/material-ui.module';
import { ThreadsComponent } from './threads/threads.component';
import { ThreadComponent } from './thread/thread.component';
import { PostComponent } from './post/post.component';
import { CommentsComponent } from './thread/comments/comments.component';
import { CommentComponent } from './thread/comment/comment.component';
import { Moment } from './shared/moment.pipe';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiDialogComponent } from './thread/emoji-dialog/emoji-dialog.component';
import { ToEmojiPipe } from './shared/to-emoji.pipe';
import { CarouselComponent } from './carousel/carousel.component';
import { AuthGuard } from '../user/services/auth.guard';
import { ImageService } from './services/image.service';
import { UserService } from '../user/services/user.service';


const routes: Routes = [
  { path: 'post', component: PostComponent, canActivate: [AuthGuard] },
  {
    path: ':forum_alias',
    component: ForumComponent,
    children: [
      { path: '', component: ThreadsComponent, },
      { path: ':thread_alias', component: ThreadComponent }
    ],
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo:'all' },
]


@NgModule({
  declarations: [
    ForumComponent,
    // ForumPostComponent,
    ThreadsComponent,
    ThreadComponent,
    PostComponent,
    CommentsComponent,
    CommentComponent,
    Moment,
    EmojiDialogComponent,
    ToEmojiPipe,
    CarouselComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MaterialUiModule,
    PickerModule
  ],
  exports: [
    RouterModule
  ],
  entryComponents: [
    EmojiDialogComponent
  ],
  providers: [
    AuthGuard,
    ImageService, 
    UserService
  ]
})
export class ForumsModule { }
