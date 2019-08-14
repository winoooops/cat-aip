import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatCardModule } from '@angular/material/card'
import { MatToolbar } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], 
  exports: [
    MatCardModule,
    MatFormFieldModule,
    MatToolbar,
    MatInputModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class MaterialUiModule { }