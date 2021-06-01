import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { AuthGuardService } from './services/auth_guard/auth-guard.service';


const routes: Routes = [
  {
    path: 'dashboard', component: HeaderComponent, canActivate: [AuthGuardService],
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
      { path: 'about', component: AboutComponent, canActivate: [AuthGuardService] },
      { path: 'all-products', component: AllProductsComponent, canActivate: [AuthGuardService] },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
