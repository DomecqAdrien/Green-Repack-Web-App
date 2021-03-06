import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProductListComponent } from './components/produit/produit-liste/product-liste.component';
import { ProductDetailComponent } from './components/produit/produit-detail/product-detail.component';
import { SellComponent } from './components/manage/manage-ventes/manage-ventes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SellDetailComponent } from './components/manage/manage-ventes/vente-detail/vente-detail.component';
import { SellFormComponent } from './components/produit/produit-vente/produit-vente.component';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AlertComponent } from './components/alert/alert.component';
import { HttpClientModule } from '@angular/common/http';
import { PaiementComponent } from './components/paiement/paiement.component';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import { SuccessComponent } from './components/paiement/success/success.component';
import { ErrorComponent } from './components/paiement/error/error.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FileUploadModule } from 'ng2-file-upload';
import { ManageComponent } from './components/manage/manage.component';
import { ManageCaracteristiquesComponent } from './components/manage/manage-caracteristiques/manage-caracteristiques.component';
import { ManageUnitesComponent } from './components/manage/manage-unites/manage-unites.component';
import { ManagePrixComponent } from './components/manage/manage-prix/manage-prix.component';
import { CompteComponent } from './components/user/compte/compte.component';
import { VentesEnCoursComponent } from './components/manage/manage-ventes/ventes-list/ventes-list.component';
import { ConfirmComponent } from './components/dialog/confirm/confirm.component';
import { ManageCategoriesComponent } from './components/manage/manage-categories/manage-categories.component';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { ManageTechniciensComponent } from './components/manage/manage-techniciens/manage-techniciens.component';
import { CreateTechnicienComponent } from './components/dialog/create-technicien/create-technicien.component';
import { CreateCaracteristiqueComponent } from './components/dialog/create-caracteristique/create-caracteristique.component';
import { CreateUniteComponent } from './components/dialog/create-unite/create-unite.component';
import { CreatePrixComponent } from './components/dialog/create-prix/create-prix.component';
import { CreateCategorieComponent } from './components/dialog/create-categorie/create-categorie.component';
import { ManageUsersComponent } from './components/manage/manage-users/manage-users.component';
import { ManageDepotsComponent } from './components/manage/manage-depots/manage-depots.component';
import { CreateDepotComponent } from './components/dialog/create-depot/create-depot.component';
import { CreateContreOffreComponent } from './components/dialog/create-contre-offre/create-contre-offre.component';
import { DepotDetailsComponent } from './components/manage/manage-depots/depot-details/depot-details.component';
import { StatisticsComponent } from './components/manage/statistics/statistics/statistics.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { GalleryModule } from 'ng-gallery';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    ProductListComponent,
    ProductDetailComponent,
    SellComponent,
    VentesEnCoursComponent,
    SellDetailComponent,
    SellFormComponent,
    PaiementComponent,
    SuccessComponent,
    ErrorComponent,
    ManageUnitesComponent,
    ManageCaracteristiquesComponent,
    ManageComponent,
    ManageCaracteristiquesComponent,
    ManageUnitesComponent,
    ManagePrixComponent,
    CompteComponent,
    ConfirmComponent,
    ManageCategoriesComponent,
    ManageTechniciensComponent,
    CreateTechnicienComponent,
    CreateCaracteristiqueComponent,
    CreateUniteComponent,
    CreatePrixComponent,
    CreateCategorieComponent,
    ManageUsersComponent,
    ManageDepotsComponent,
    CreateDepotComponent,
    CreateContreOffreComponent,
    DepotDetailsComponent,
    StatisticsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxStripeModule.forRoot(environment.stripePublicKey),
    NgxDropzoneModule,
    NgbModule,
    FileUploadModule,
    GalleryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
