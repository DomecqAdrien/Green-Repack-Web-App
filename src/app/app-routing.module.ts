import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { ErrorComponent } from './components/paiement/error/error.component';
import { PaiementComponent } from './components/paiement/paiement.component';
import { SuccessComponent } from './components/paiement/success/success.component';
import { ProductDetailComponent } from './components/produit/product-detail/product-detail.component';
import { ProductListComponent } from './components/produit/product-list/product-list.component';
import { RegisterComponent } from './components/user/register/register.component';
import { SellDetailComponent } from './components/manage/manage-ventes/vente-detail/vente-detail.component';
import { SellFormComponent } from './components/vente/vente-create/vente-create.component';
import { SellComponent } from './components/manage/manage-ventes/manage-ventes.component';
import { AuthGuard } from './guard/auth.guard.service';
import { ManageUnitesComponent } from './components/manage/manage-unites/manage-unites.component';
import { ManageCaracteristiquesComponent } from './components/manage/manage-caracteristiques/manage-caracteristiques.component';
import { ManageComponent } from './components/manage/manage.component';
import { UserSettingsComponent } from './components/user/user-settings/user-settings.component';
import { ManageTechniciensComponent } from './components/manage/manage-techniciens/manage-techniciens.component';
const routes: Routes = [

  // user
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'compte', component: UserSettingsComponent, canActivate: [AuthGuard] },

  // product
  { path: 'produit/:id', component: ProductDetailComponent },
  { path: 'produits', component: ProductListComponent },
  { path: '', component: ProductListComponent },


  // ventes
  { path: 'manage/ventes', component: SellComponent, canActivate: [AuthGuard] },
  { path: 'ventes/new', component: SellFormComponent, canActivate: [AuthGuard] },

  // Paiement
  { path: 'paiement', component: PaiementComponent, canActivate: [AuthGuard] },
  { path: 'paiement/success', component: SuccessComponent, canActivate: [AuthGuard] },
  { path: 'paiement/error', component: ErrorComponent, canActivate: [AuthGuard] },

  // Admin
  { path: 'manage', component: ManageComponent, canActivate: [AuthGuard] },
  { path: 'manage/techniciens', component: ManageTechniciensComponent, canActivate: [AuthGuard] },
  { path: 'manage/ventes/:id', component: SellDetailComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'produits'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
