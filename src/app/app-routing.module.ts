import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { HomeComponent } from './home/home/home.component';
import { ListProductsComponent } from './home/home/list-products/list-products.component';
import { RegisterComponent } from './home/register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'register', pathMatch: 'full'
  },
  {
    path: 'register', component: RegisterComponent 
  },
  {
    path: 'home', component: HomeComponent, children: [
      {path: 'products', component: ListProductsComponent}
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
