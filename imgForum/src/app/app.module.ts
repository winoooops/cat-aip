import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MaterialUiModule } from './material-ui/material-ui.module'
import { AppComponent } from './app.component';
import { ForumComponent } from './forum/forum.component';

@NgModule({
  declarations: [
    AppComponent,
    ForumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialUiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
