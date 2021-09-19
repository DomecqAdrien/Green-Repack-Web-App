import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SellComponent } from './components/sell/sell.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SellNewComponent } from './components/sell/sell-new/sell-new.component';
import { SellCompletedComponent } from './components/sell/sell-completed/sell-completed.component';
import { SellDetailComponent } from './components/sell/sell-detail/sell-detail.component';
import { SellFormComponent } from './components/sell/sell-form/sell-form.component';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AlertComponent } from './components/alert/alert.component';
import { HttpClientModule } from '@angular/common/http';
import { PaiementComponent } from './components/paiement/paiement.component';
import { NgxStripeModule } from 'ngx-stripe';
import { env } from 'process';
import { environment } from 'src/environments/environment';
import { SuccessComponent } from './components/paiement/success/success.component';
import { ErrorComponent } from './components/paiement/error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    ProductListComponent,
    ProductDetailComponent,
    SellComponent,
    SellCompletedComponent,
    SellNewComponent,
    SellDetailComponent,
    SellFormComponent,
    PaiementComponent,
    SuccessComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxStripeModule.forRoot(environment.stripePublicKey)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
