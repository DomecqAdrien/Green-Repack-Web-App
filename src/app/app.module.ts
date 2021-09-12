import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SellComponent } from './components/sell/sell.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SellNewComponent } from './components/sell/sell-new/sell-new.component';
import { SellCompletedComponent } from './components/sell/sell-completed/sell-completed.component';
import { SellDetailComponent } from './components/sell/sell-detail/sell-detail.component';
import { SellFormComponent } from './components/sell/sell-form/sell-form.component';
import { MaterialModule } from './material/material.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductListComponent,
    ProductDetailComponent,
    SellComponent,
    SellCompletedComponent,
    SellNewComponent,
    SellDetailComponent,
    SellFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
