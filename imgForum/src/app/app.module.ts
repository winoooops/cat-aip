import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { MaterialUiModule } from './material-ui/material-ui.module'
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RankComponent } from './rank/rank.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiDialogComponent } from './emoji-dialog/emoji-dialog.component';
// Emoji component: https://www.npmjs.com/package/@ctrl/ngx-emoji-mart

@NgModule({
  declarations: [
    AppComponent,
    RankComponent,
    EmojiDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialUiModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    PickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
