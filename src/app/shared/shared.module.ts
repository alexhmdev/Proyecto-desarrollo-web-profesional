import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfirmMenu, NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatMenuModule } from "@angular/material/menu";
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from "@angular/material/sidenav";
@NgModule({
  declarations: [NavbarComponent,DialogConfirmMenu],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatMenuModule,
    MatDialogModule,
    MatSidenavModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule { }
