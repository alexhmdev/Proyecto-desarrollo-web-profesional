import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RegisterComponent } from "./home/register/register.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// Recaptcha module
import { RecaptchaModule } from "ng-recaptcha";
// Http modules
import { HttpClientModule } from "@angular/common/http";
// Angular Flex layout
import { FlexLayoutModule } from "@angular/flex-layout";
// Angular Material modules
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatExpansionModule } from "@angular/material/expansion";
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 

// Cookies
import { CookieService } from "ngx-cookie-service";
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './home/home/home.component';
import { SharedModule } from "./shared/shared.module";
import { ListProductsComponent } from './home/home/list-products/list-products.component';
import { ProductComponent } from './home/home/product/product.component';
import { RouterModule } from '@angular/router';
import { CarCrudComponent } from './home/home/car-crud/car-crud.component';

@NgModule({
  declarations: [AppComponent, RegisterComponent, NotFoundComponent, HomeComponent, ListProductsComponent, ProductComponent, CarCrudComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    // Angular Material modules
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatTabsModule,
    MatCheckboxModule,
    MatGridListModule,
    MatExpansionModule,
    MatAutocompleteModule,
    // Captcha
    RecaptchaModule,
    // Flex layout
    FlexLayoutModule,
    SharedModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
