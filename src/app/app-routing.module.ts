import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { ErrorComponent } from './components/paiement/error/error.component';
import { PaiementComponent } from './components/paiement/paiement.component';
import { SuccessComponent } from './components/paiement/success/success.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { RegisterComponent } from './components/user/register/register.component';
import { SellDetailComponent } from './components/sell/sell-detail/sell-detail.component';
import { SellFormComponent } from './components/sell/sell-form/sell-form.component';
import { SellComponent } from './components/sell/sell.component';
import { AuthGuard } from './guard/auth.guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // product
  { path: 'produit/:id', component: ProductDetailComponent },
  { path: 'produits', component: ProductListComponent },
  { path: '', component: ProductListComponent },


  // ventes
  { path: 'ventes', component: SellComponent, canActivate: [AuthGuard] },
  { path: 'ventes/new', component: SellFormComponent },
  { path: 'ventes/:id', component: SellDetailComponent },

  // Paiement
  { path: 'paiement', component: PaiementComponent },
  { path: 'paiement/success', component: SuccessComponent },
  { path: 'paiement/error', component: ErrorComponent },

  { path: '**', redirectTo: 'produits'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
