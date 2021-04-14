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
import {MatBadgeModule} from '@angular/material/badge'; 
import { RouterModule } from "@angular/router";
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [NavbarComponent,DialogConfirmMenu],
  imports: [
    FormsModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatMenuModule,
    MatDialogModule,
    MatSidenavModule,
    MatBadgeModule,
    MatFormFieldModule,
    RouterModule,
    MatInputModule
  ],
  exports: [
    NavbarComponent,
  ]
})
export class SharedModule { }
