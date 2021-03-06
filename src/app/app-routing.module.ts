import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { ErrorComponent } from './components/paiement/error/error.component';
import { PaiementComponent } from './components/paiement/paiement.component';
import { SuccessComponent } from './components/paiement/success/success.component';
import { ProductDetailComponent } from './components/produit/produit-detail/product-detail.component';
import { ProductListComponent } from './components/produit/produit-liste/product-liste.component';
import { RegisterComponent } from './components/user/register/register.component';
import { SellDetailComponent } from './components/manage/manage-ventes/vente-detail/vente-detail.component';
import { SellFormComponent } from './components/produit/produit-vente/produit-vente.component';
import { SellComponent } from './components/manage/manage-ventes/manage-ventes.component';
import { AuthGuard } from './services/guard/auth.guard.service';
import { ManageComponent } from './components/manage/manage.component';
import { CompteComponent } from './components/user/compte/compte.component';
import { ManageTechniciensComponent } from './components/manage/manage-techniciens/manage-techniciens.component';
import { IsAdmin } from './services/guard/roles/is-admin.service';
import { IsTechnicien } from './services/guard/roles/is-technicien.service';
import { IsMarchand } from './services/guard/roles/is-marchand.service';
import { DepotDetailsComponent } from './components/manage/manage-depots/depot-details/depot-details.component';
import { StatisticsComponent } from './components/manage/statistics/statistics/statistics.component';

const routes: Routes = [

  // user
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'compte', component: CompteComponent, canActivate: [AuthGuard] },

  // product
  { path: 'produit/:id', component: ProductDetailComponent },
  { path: 'produits', component: ProductListComponent },
  { path: '', component: ProductListComponent },


  // ventes
  { path: 'manage/ventes', component: SellComponent, canActivate: [AuthGuard, IsTechnicien] },
  { path: 'ventes/new', component: SellFormComponent, canActivate: [AuthGuard, IsMarchand] },

  // Paiement
  { path: 'paiement', component: PaiementComponent, canActivate: [AuthGuard] },
  { path: 'paiement/success', component: SuccessComponent, canActivate: [AuthGuard] },
  { path: 'paiement/error', component: ErrorComponent, canActivate: [AuthGuard] },

  // Admin
  { path: 'manage', component: ManageComponent, canActivate: [AuthGuard, IsTechnicien] },
  { path: 'manage/techniciens', component: ManageTechniciensComponent, canActivate: [AuthGuard, IsAdmin] },
  { path: 'manage/ventes/:id', component: SellDetailComponent, canActivate: [AuthGuard, IsTechnicien] },

  // Depot details
  { path: 'manage/depot/:id', component: DepotDetailsComponent, canActivate: [AuthGuard, IsTechnicien] },

  // Statistiques StatisticsComponent
  { path: 'statistiques', component: StatisticsComponent, canActivate: [AuthGuard, IsTechnicien] },

  { path: '**', redirectTo: 'produits'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
