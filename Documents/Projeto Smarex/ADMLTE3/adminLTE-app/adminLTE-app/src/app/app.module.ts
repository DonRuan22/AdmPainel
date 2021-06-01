import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { AddComponent } from './components/add-component/add-component.component';
import {HttpClientModule} from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';  
import { FormsModule } from '@angular/forms'; 
import {MatIconModule} from '@angular/material/icon';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatButtonModule} from '@angular/material/button';
import { DetailedOrderComponent } from './components/detailed-order/detailed-order.component';
import {SocialAuthServiceConfig, GoogleLoginProvider, SocialLoginModule} from 'angularx-social-login';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    AllProductsComponent,
    EditProductComponent,
    AddComponent,
    DetailedOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule, 
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MDBBootstrapModule,
    FormsModule,
    MatButtonModule,
    MatPaginatorModule,
    HttpClientModule,
    MatTableModule,
    SocialLoginModule
  ],
  providers: [
    {
    provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '898420138508-ljocqjeec7lu9gq0jk36ggc7hb2qc7fa.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
