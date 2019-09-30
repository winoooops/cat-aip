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


@NgModule({
  declarations: [
    AppComponent,
    RankComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialUiModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
