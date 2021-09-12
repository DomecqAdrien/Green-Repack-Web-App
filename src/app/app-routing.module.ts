import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { SellDetailComponent } from './components/sell/sell-detail/sell-detail.component';
import { SellFormComponent } from './components/sell/sell-form/sell-form.component';
import { SellComponent } from './components/sell/sell.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // product
  { path: 'product', component: ProductDetailComponent},

  // ventes
  { path: 'ventes', component: SellComponent},
  { path: 'ventes/new', component: SellFormComponent},
  { path: 'ventes/:id', component: SellDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
