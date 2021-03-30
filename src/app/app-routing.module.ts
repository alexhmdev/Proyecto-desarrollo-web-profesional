import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { CarCrudComponent } from './home/home/car-crud/car-crud.component';
import { HomeComponent } from './home/home/home.component';
import { ListProductsComponent } from './home/home/list-products/list-products.component';
import { ProductComponent } from './home/home/product/product.component';
import { RegisterComponent } from './home/register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'home/products', pathMatch: 'full'
  },
  {
    path: 'register', component: RegisterComponent 
  },
  {
    path: 'home', component: HomeComponent, children: [
      {path: 'products', component: ListProductsComponent},
      {path: 'product', component: ProductComponent},
      {path: 'card-crud', component: CarCrudComponent }
    ]
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
