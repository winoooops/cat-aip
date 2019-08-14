import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatCardModule } from '@angular/material/card'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], 
  exports: [
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
  ]
})
export class MaterialUiModule { }
